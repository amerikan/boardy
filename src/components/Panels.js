import { el } from "../utils";

import InfoPanel from "./InfoPanel";
import PropertiesPanel from "./PropertiesPanel";
import LayersPanel from "./LayersPanel";

export default function () {
  return el(
    "div",
    {
      style: {
        background: "#ccc",
        width: "300px",
      },
    },
    InfoPanel(),
    PropertiesPanel(),
    LayersPanel()
  );
}
