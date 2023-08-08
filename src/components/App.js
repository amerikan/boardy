import { el } from "../utils";

export default function ({ children }) {
  return el(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "stretch",
        height: "100%",
      },
    },
    ...children
  );
}
