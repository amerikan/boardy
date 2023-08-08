import { el } from "../../utils";

export default function ItalicizeButton({ isActive, onclick }) {
  return el(
    "button",
    {
      style: {
        fontStyle: isActive ? "italic" : "normal",
      },
      onclick,
    },
    el("i", null, "I")
  );
}
