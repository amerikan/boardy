import { el } from "./utils";

function Layer() {
  this.objects = [];
}

Layer.prototype.add = function (obj) {
  this.objects.push(obj);
};

Layer.prototype.remove = function (id) {
  const idx = this.objects.findIndex((o) => o.id === id);

  this.objects.splice(idx, 1);

  console.log(this.objects);
};

export default function Boardy(selector) {
  this.$canvas = document.querySelector(selector);
  this.model = new Layer();
}

Boardy.prototype.mount = function () {
  const _this = this;
  const $canvas = this.$canvas;

  // Track mouse crosshair position
  let MOUSE_X = 0;
  let MOUSE_Y = 0;

  $canvas.addEventListener("mousemove", function (e) {
    MOUSE_X = e.clientX;
    MOUSE_Y = e.clientY;
  });

  $canvas.addEventListener("dblclick", function () {
    const newTextBox = new Text({
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
  const _this = this;
  const $canvas = this.$canvas;

  const content = this.model.objects.map(function (o) {
    const textBox = el(
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
          // Update Model
          o.content = this.innerText || this.textContent;

          // Update UI
          this.innerHTML = o.content;
          this.contentEditable = false;
          this.style.background = "transparent";
        },
      },
      o.content
    );

    // Bold button setup
    const boldButton = el(
      "button",
      {
        onclick: function (e) {
          // Update Model
          if (o.weight === "bold") {
            o.weight = "normal";
          } else if (o.weight === "normal") {
            o.weight = "bold";
          }

          // Update UI
          textBox.style.fontWeight = o.weight;
        },
      },
      el("b", null, "B")
    );

    // Italics button setup
    const italicizeButton = el(
      "button",
      {
        onclick: function (e) {
          // Update Model
          if (o.style === "italic") {
            o.style = "normal";
          } else if (o.style === "normal") {
            o.style = "italic";
          }

          // Update UI
          textBox.style.fontStyle = o.style;
        },
      },
      el("i", null, "I")
    );

    // Font size select setup
    const sizeOptions = [2, 5, 7, 10].map((size) =>
      el(
        "option",
        {
          value: size,
        },
        size
      )
    );

    const fontSizeSelect = el(
      "select",
      {
        onchange: function (e) {
          // Update model
          o.size = this.value + "em";

          // Update UI
          textBox.style.fontSize = o.size;
        },
      },
      ...sizeOptions
    );

    // Delete button setup
    const deleteButton = el(
      "button",
      {
        onclick: function (e) {
          // Update Model
          _this.model.remove(o.id);

          // Update UI
          $canvas.removeChild(container);
        },
      },
      "x"
    );

    // Controls bar
    const tools = el(
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

    const container = el(
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
          // Update UI
          textBox.style.borderColor = "#000";
          tools.style.display = "block";
        },
        onmouseleave: function () {
          // Update UI
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
      // Update Model
      o.position.top = e.clientY + "px";
      o.position.left = e.clientX + "px";

      // Update UI
      container.style.top = e.clientY + "px";
      container.style.left = e.clientX + "px";
    }

    return container;
  });

  $canvas.append(...content);
};

let FAKE_ID = 1;

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
