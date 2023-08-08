import { el } from "../../utils";

export default function () {
  return el(
    "div",
    {
      title: "Text tool",
      style: {
        border: "1px solid black",
        padding: "10px",
      },
    },
    "T"
  );
}
