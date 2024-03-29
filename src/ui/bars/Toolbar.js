import { el } from "../../utils";

import TextTool from "../tools/TextTool";

export default function Toolbar() {
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
