import { el } from "../utils";

export default function ({ children }) {
  return el(
    "div",
    {
      style: {
        border: "1px solid black",
        width: "calc(100% - 300px - 30px)",
        overflow: "hidden",
        position: "relative",
      },
    },
    ...children
  );
}
