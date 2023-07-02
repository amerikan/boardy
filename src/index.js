import { el } from "./utils";

function Layer() {
  this.objects = [];
}

Layer.prototype.add = function (obj) {
  this.objects.push(obj);
};

export default function Boardy(selector) {
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
      position: {
        top: MOUSE_Y + "px",
        left: MOUSE_X + "px",
      },
    });

    _this.model.add(newTextBox);
    _this.render();

    console.log(_this.model);
  });
};

Boardy.prototype.render = function () {
  var $canvas = this.$canvas;
  this.$canvas.innerHTML = "";

  this.model.objects.forEach(function (o) {
    var textBox = el(
      "div",
      {
        style: {
          border: "1px dotted transparent",
          display: "block",
          position: "relative",
          cursor: "move",
          fontSize: o.size,
          fontStyle: o.style,
          fontWeight: o.weight,
          color: o.color,
          width: o.bounds.width,
          height: o.bounds.height,
        },
        ondblclick: function (e) {
          e.stopPropagation();
          this.contentEditable = true;
          this.focus();
        },
        onblur: function (e) {
          var updatedText = textBox.innerText || textBox.textContent;

          o.content = updatedText;

          this.innerHTML = updatedText;
          this.contentEditable = false;
          this.style.background = "transparent";
        },
      },
      o.content
    );

    // Bold button setup
    var boldButton = el(
      "button",
      {
        onclick: function (e) {
          if (o.weight === "bold") {
            o.weight = "normal";
          } else if (o.weight === "normal") {
            o.weight = "bold";
          }

          textBox.style.fontWeight = o.weight;
        },
      },
      el("b", null, "B")
    );

    // Italics button setup
    var italicizeButton = el(
      "button",
      {
        onclick: function (e) {
          if (o.style === "italic") {
            o.style = "normal";
          } else if (o.style === "normal") {
            o.style = "italic";
          }

          textBox.style.fontStyle = o.style;
        },
      },
      el("i", null, "I")
    );

    // Font size select setup
    var sizeOptions = [2, 5, 7, 10].map((size) =>
      el(
        "option",
        {
          value: size,
        },
        size
      )
    );

    var fontSizeSelect = el(
      "select",
      {
        onchange: function (e) {
          o.size = this.value + "em";
          textBox.style.fontSize = o.size;
        },
      },
      ...sizeOptions
    );

    // Delete button setup
    var deleteButton = el(
      "button",
      {
        onclick: function (e) {
          $canvas.removeChild(container);
        },
      },
      "&times;"
    );

    // Controls bar
    var tools = el(
      "div",
      {
        style: {
          display: "none",
          position: "absolute",
          top: "-23px",
          border: "1px solid #ccc",
        },
      },
      boldButton,
      italicizeButton,
      fontSizeSelect,
      deleteButton
    );

    var container = el(
      "div",
      {
        className: "text-object",
        style: {
          position: "absolute",
          top: o.position.top,
          left: o.position.left,
          whiteSpace: "nowrap",
        },
        onmouseover: function () {
          textBox.style.borderColor = "#000";
          tools.style.display = "block";
        },
        onmouseleave: function () {
          textBox.style.borderColor = "transparent";
          tools.style.display = "none";
        },
        onmousedown: function () {
          window.addEventListener("mousemove", move);
        },
      },
      textBox,
      tools
    );

    window.addEventListener("mouseup", function () {
      window.removeEventListener("mousemove", move);
    });

    function move(e) {
      o.position.top = e.clientY + "px";
      o.position.left = e.clientX + "px";

      container.style.top = e.clientY + "px";
      container.style.left = e.clientX + "px";
    }

    $canvas.append(container);
  });
};

var FAKE_ID = 1;

function Text({
  content = "Text",
  bounds = {
    height: "auto",
    width: "auto",
  },
  color = "black",
  size = "5em",
  position,
  weight = "normal",
  style = "normal",
}) {
  this.id = FAKE_ID++;
  this.type = "TEXT";

  this.content = content;
  this.bounds = bounds;
  this.color = color;
  this.size = size;
  this.position = position;
  this.weight = weight;
  this.style = style;
}
