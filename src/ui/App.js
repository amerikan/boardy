import { el } from "../utils";

import Board from "./Board";
import Panels from "./Panels";
import Toolbar from "./bars/Toolbar";

export default function App() {
  return el(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "stretch",
        height: "100%",
      },
    },
    Toolbar(),
    Board(),
    Panels()
  );
}
