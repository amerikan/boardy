import { el } from "../../utils";

export default function ({ isActive, onclick }) {
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
