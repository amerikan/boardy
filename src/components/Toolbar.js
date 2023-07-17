import { el } from "../utils";

import TextTool from "./TextTool";

export default function () {
  return el(
    "div",
    {
      style: {
        background: "#ccc",
        border: "1px solid black",
        width: "30px",
      },
    },
    TextTool()
  );
}