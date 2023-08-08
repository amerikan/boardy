import { el } from "../../utils";

export default function InfoPanel() {
  return el(
    "div",
    {
      style: {
        border: "1px solid black",
      },
    },
    el("p", null, `x: 0 y: 0`)
  );
}
