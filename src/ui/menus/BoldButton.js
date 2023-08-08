import { el } from "../../utils";

export default function BoldButton({ isActive, onclick }) {
  return el(
    "button",
    {
      style: {
        fontWeight: isActive ? "bold" : "normal",
      },
      onclick,
    },
    el("b", null, "B")
  );
}
