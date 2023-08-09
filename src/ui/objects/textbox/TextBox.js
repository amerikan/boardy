import { el } from "../../../utils";

export default function TextBox({ o }) {
  return el(
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

        this.style.borderColor = "#000";
      },
      onblur: function (e) {
        // Update Model
        o.content = this.innerText || this.textContent;

        // Update UI
        // this.innerHTML = o.content;
        this.contentEditable = false;
        this.style.background = "transparent";
      },
    },
    o.content
  );
}
