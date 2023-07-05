import { el } from "./utils";

import Panels from "./components/Panels";
import Toolbar from "./components/Toolbar";

import BoldButton from "./components/BoldButton";
import ItalicizeButton from "./components/ItalicizeButton";
import DeleteButton from "./components/DeleteButton";
import FontSizeSelect from "./components/FontSizeSelect";

class Layer {
  constructor() {
    this.objects = [];
  }

  add(obj) {
    this.objects.push(obj);
  }

  remove(id) {
    const idx = this.objects.findIndex((o) => o.id === id);

    this.objects.splice(idx, 1);

    console.log(id, this.objects);
  }
}

export default class Boardy {
  constructor(selector) {
    this.$root = document.querySelector(selector);
    this.model = new Layer();
  }

  mount() {
    const $root = this.$root;

    // Track mouse crosshair position
    let MOUSE_X = 0;
    let MOUSE_Y = 0;

    $root.addEventListener("mousemove", function (e) {
      MOUSE_X = e.clientX;
      MOUSE_Y = e.clientY;
    });

    $root.addEventListener("dblclick", () => {
      const newTextBox = new Text({
        position: {
          top: MOUSE_Y + "px",
          left: MOUSE_X + "px",
        },
      });

      this.model.add(newTextBox);
      this.render();

      console.log(this.model);
    });

    this.render();
  }

  render() {
    const _this = this;
    const $root = this.$root;

    $root.innerHTML = "";

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
        BoldButton({
          isActive: o.weight === "bold",
          onclick: function (e) {
            // Update Model
            if (o.weight === "bold") {
              o.weight = "normal";
            } else if (o.weight === "normal") {
              o.weight = "bold";
            }

            // Update UI
            _this.render();
          },
        }),
        ItalicizeButton({
          isActive: o.style === "italic",
          onclick: function (e) {
            // Update Model
            if (o.style === "italic") {
              o.style = "normal";
            } else if (o.style === "normal") {
              o.style = "italic";
            }

            // Update UI
            _this.render();
          },
        }),
        FontSizeSelect({
          onchange: function (e) {
            // Update model
            o.size = this.value + "em";

            // Update UI
            _this.render();
          },
        }),
        DeleteButton({
          onclick: function (e) {
            // Update Model
            _this.model.remove(o.id);

            // Update UI
            _this.render();
          },
        })
      );

      const containerPointerPosition = {
        x: null,
        y: null,
      };

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
          onmousedown: function (e) {
            window.addEventListener("mousemove", handleMove);

            containerPointerPosition.x = e.pageX - e.currentTarget.offsetLeft;
            containerPointerPosition.y = e.pageY - e.currentTarget.offsetTop;
          },
        },
        textBox,
        tools
      );

      window.addEventListener("mouseup", function () {
        window.removeEventListener("mousemove", handleMove);
      });

      function handleMove(e) {
        // Update Model
        o.position.left = e.clientX - containerPointerPosition.x + "px";
        o.position.top = e.clientY - containerPointerPosition.y + "px";

        // Update UI
        container.style.left = e.clientX - containerPointerPosition.x + "px";
        container.style.top = e.clientY - containerPointerPosition.y + "px";
      }

      return container;
    });

    const canvas = () =>
      el(
        "div",
        {
          style: {
            border: "1px solid black",
            width: "calc(100% - 300px - 30px)",
            overflow: "hidden",
            position: "relative",
          },
        },
        ...content
      );

    const app = () =>
      el(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "stretch",
            height: "100%",
          },
        },
        Toolbar(),
        canvas(),
        Panels()
      );

    $root.appendChild(app());
  }
}

let FAKE_ID = 1;

class Text {
  constructor({
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
}
