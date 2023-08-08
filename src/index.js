import { el } from "./utils";

import App from "./components/App";
import Board from "./components/Board";

import Panels from "./components/Panels";
import Toolbar from "./components/bars/Toolbar";

import BoldButton from "./components/menus/BoldButton";
import ItalicizeButton from "./components/menus/ItalicizeButton";
import DeleteButton from "./components/menus/DeleteButton";
import FontSizeSelect from "./components/menus/FontSizeSelect";

import Layer from "./controllers/Layer";

import Text from "./models/Text";
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

            // Update UI
            textBox.style.borderColor = "#000";
            tools.style.display = "block";
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
            // _this.render();
            textBox.style.fontWeight = o.weight;
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
            // _this.render();
            textBox.style.fontStyle = o.style;
          },
        }),
        FontSizeSelect({
          onchange: function (e) {
            // Update model
            o.size = this.value + "em";

            // Update UI
            // _this.render();
            textBox.style.fontSize = o.size;
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

    $root.appendChild(
      App({
        children: [
          Toolbar(),
          Board({
            children: content,
          }),
          Panels(),
        ],
      })
    );
  }
}
