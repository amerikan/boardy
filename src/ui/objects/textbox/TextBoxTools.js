import { el } from "../../../utils";

import BoldButton from "../../menus/BoldButton";
import ItalicizeButton from "../../menus/ItalicizeButton";
import DeleteButton from "../../menus/DeleteButton";
import FontSizeSelect from "../../menus/FontSizeSelect";

export default function TextBoxTools({ o }) {
  return el(
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
        // textBox.style.fontWeight = o.weight;
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
        // textBox.style.fontStyle = o.style;
      },
    }),
    FontSizeSelect({
      onchange: function (e) {
        // Update model
        o.size = this.value + "em";

        // Update UI
        // textBox.style.fontSize = o.size;
      },
    }),
    DeleteButton({
      onclick: function (e) {
        // Update Model
        // _this.layer.remove(o.id);
        // Update UI
        // _this.render();
      },
    })
  );
}
