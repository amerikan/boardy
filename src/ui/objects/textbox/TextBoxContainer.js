import { el } from "../../../utils";

import TextBox from "./TextBox";
import TextBoxTools from "./TextBoxTools";

import store from "../../../store/app.store";

export default function TextBoxContainer({ o }) {
  const containerPointerPosition = {
    x: null,
    y: null,
  };

  return el(
    "div",
    {
      className: "text-object",
      style: {
        position: "absolute",
        top: o.position.top,
        left: o.position.left,
        whiteSpace: "nowrap",
      },
      onmousedown(e) {
        function handleMove(e) {
          // Update Model
          o.position.left = e.clientX - containerPointerPosition.x + "px";
          o.position.top = e.clientY - containerPointerPosition.y + "px";

          store.update({});
        }

        window.addEventListener("mousemove", handleMove);

        containerPointerPosition.x = e.pageX - e.currentTarget.offsetLeft;
        containerPointerPosition.y = e.pageY - e.currentTarget.offsetTop;

        window.addEventListener("mouseup", () => {
          window.removeEventListener("mousemove", handleMove);
        });
      },
    },
    TextBox({ o }),
    TextBoxTools({ o })
  );
}
