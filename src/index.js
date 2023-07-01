// DOM Element creation helper
function el(type) {
  return document.createElement(type);
}

// Add styles in mass helper
function addStyles(el, styles) {
  for (var style in styles) {
    el.style[style] = styles[style];
  }

  return el;
}

function Layer() {
  this.objects = [];
}

Layer.prototype.add = function (obj) {
  this.objects.push(obj);
};

function Boardy(selector) {
  this.$canvas = document.querySelector(selector);
  this.model = new Layer();
}

Boardy.prototype.mount = function () {
  var _this = this;
  var $canvas = this.$canvas;

  // Track mouse crosshair position
  var MOUSE_X = 0;
  var MOUSE_Y = 0;

  $canvas.style.background = "#efefef"; //debugging

  $canvas.addEventListener("mousemove", function (e) {
    MOUSE_X = e.clientX;
    MOUSE_Y = e.clientY;
  });

  $canvas.addEventListener("dblclick", function () {
    var newTextBox = new Text({
      content: "Text",
      bounds: {
        height: "auto",
        width: "auto",
      },
      color: "black",
      size: "5em",
      position: {
        top: MOUSE_Y + "px",
        left: MOUSE_X + "px",
      },
      weight: "normal",
      style: "normal",
    });

    _this.model.add(newTextBox);
    _this.draw();

    console.log(_this.model);
  });
};

Boardy.prototype.draw = function () {
  var $canvas = this.$canvas;
  this.$canvas.innerHTML = "";

  this.model.objects.forEach(function (o) {
    var container = el("div");
    var textBox = el("div");

    textBox.innerHTML = o.content;

    addStyles(textBox, {
      border: "1px dotted transparent",
      display: "block",
      position: "relative",
      cursor: "move",
      fontSize: o.size,
      fontWeight: o.weight,
      color: o.color,
      width: o.bounds.width,
      height: o.bounds.height,
    });

    // Bold button setup
    var boldButton = el("button");
    boldButton.innerHTML = "<b>B</b>";
    boldButton.addEventListener("click", function (e) {
      if (o.weight === "bold") {
        o.weight = "normal";
        textBox.style.fontWeight = "normal";
      } else if (o.weight === "normal") {
        o.weight = "bold";
        textBox.style.fontWeight = "bold";
      }
    });

    // Italics button setup
    var italicizeButton = el("button");
    italicizeButton.innerHTML = "<i>I</i>";
    italicizeButton.addEventListener("click", function (e) {
      if (o.style === "italic") {
        o.style = "normal";
        textBox.style.fontStyle = "normal";
      } else if (o.style === "normal") {
        o.style = "italic";
        textBox.style.fontStyle = "italic";
      }
    });

    // Font size select setup
    var fontSizeSelect = el("select");
    fontSizeSelect.innerHTML =
      '<option value="2">2</option><option value="5">5</option><option value="7">7</option><option value="10">10</option>';
    fontSizeSelect.addEventListener("change", function (e) {
      textBox.style.fontSize = this.value + "em";
    });

    // Delete button setup
    var deleteButton = el("button");
    deleteButton.innerHTML = "&times;";
    deleteButton.addEventListener("click", function (e) {
      $canvas.removeChild(container);
    });

    // Controls bar
    var tools = el("div");

    addStyles(tools, {
      display: "none",
      position: "absolute",
      top: "-23px",
      border: "1px solid #ccc",
    });

    tools.append(boldButton, italicizeButton, fontSizeSelect, deleteButton);

    container.className = "text-object";

    addStyles(container, {
      position: "absolute",
      top: o.position.top,
      left: o.position.left,
      whiteSpace: "nowrap",
    });

    container.append(textBox, tools);

    container.addEventListener("mouseover", function () {
      textBox.style.borderColor = "#000";
      tools.style.display = "block";
    });

    container.addEventListener("mouseleave", function () {
      textBox.style.borderColor = "transparent";
      tools.style.display = "none";
    });

    // Editable text
    textBox.addEventListener("dblclick", function (e) {
      e.stopPropagation();
      this.contentEditable = true;
      this.focus();
      this.style.background = "#ffffff";
    });

    textBox.addEventListener("blur", function () {
      var updatedText = textBox.innerText || textBox.textContent;

      o.content = updatedText;

      this.innerHTML = updatedText;
      this.contentEditable = false;
      this.style.background = "transparent";
    });

    // Dragging text box
    container.addEventListener("mousedown", function () {
      window.addEventListener("mousemove", move);
    });

    window.addEventListener("mouseup", function () {
      window.removeEventListener("mousemove", move);
    });

    function move(e) {
      o.position.top = e.clientY;
      o.position.left = e.clientX;

      container.style.top = e.clientY + "px";
      container.style.left = e.clientX + "px";
    }

    $canvas.append(container);
  });
};

var FAKE_ID = 1;

function Text({ content, bounds, color, size, position, weight, style }) {
  this.id = FAKE_ID++;
  this.type = "TEXT";

  this.bounds = bounds;
  this.content = content;
  this.color = color;
  this.size = size;
  this.weight = weight;
  this.style = style;
  this.position = position;
}
