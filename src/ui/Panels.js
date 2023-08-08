import { el } from "../utils";

import InfoPanel from "./panels/InfoPanel";
import PropertiesPanel from "./panels/PropertiesPanel";
import LayersPanel from "./panels/LayersPanel";

export default function Panels() {
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
