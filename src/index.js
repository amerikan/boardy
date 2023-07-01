// DOM Element creation helper
function el(type) {
  return document.createElement(type);
}

function Canvas() {
  this.objects = [];
}

Canvas.prototype.add = function (obj) {
  this.objects.push(obj);
};

Canvas.prototype.draw = function () {
  var canvas = document.getElementById("canvas");
  canvas.innerHTML = "";

  this.objects.forEach(function (o) {
    var container = el("div");
    var textBox = el("div");

    var tools = el("div");
    var boldButton = el("button");
    var italicizeButton = el("button");
    var fontSizeSelect = el("select");
    var deleteButton = el("button");

    textBox.innerHTML = o.content;

    textBox.style.border = "1px dotted transparent";
    textBox.style.display = "block";
    textBox.style.position = "relative";
    textBox.style.cursor = "move";

    textBox.style.fontSize = o.size;
    textBox.style.fontWeight = o.weight;
    textBox.style.color = o.color;
    textBox.style.width = o.bounds.width;
    textBox.style.height = o.bounds.height;

    // Bold button setup
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
    fontSizeSelect.innerHTML =
      '<option value="2">2</option><option value="5">5</option><option value="7">7</option><option value="10">10</option>';
    fontSizeSelect.addEventListener("change", function (e) {
      textBox.style.fontSize = this.value + "em";
    });

    // Delete button setup
    deleteButton.innerHTML = "&times;";
    deleteButton.addEventListener("click", function (e) {
      canvas.removeChild(container);
    });

    tools.style.display = "none";
    tools.style.position = "absolute";
    tools.style.top = "-23px";
    tools.style.border = "1px solid #ccc";
    tools.appendChild(boldButton);
    tools.appendChild(italicizeButton);
    tools.appendChild(fontSizeSelect);
    tools.appendChild(deleteButton);

    container.className = "text-object";
    container.style.width = "100%";
    container.style.position = "absolute";
    container.style.top = o.position.top;
    container.style.left = o.position.left;

    container.appendChild(textBox);
    container.appendChild(tools);

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

    canvas.appendChild(container);
  });
};

function Text({ content, bounds, color, size, position, weight, style }) {
  this.bounds = bounds;
  this.content = content;
  this.color = color;
  this.size = size;
  this.weight = weight;
  this.style = style;
  this.position = position;
}
