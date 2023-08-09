import { el } from "../utils";

import TextBoxContainer from "./objects/textbox/TextBoxContainer";

import Layer from "../controllers/Layer";

import Text from "../models/Text";

import store from "../store/app.store";

const layer = new Layer();

function ObjectList() {
  return el(
    "div",
    null,
    ...layer.objects.map((o) => {
      return TextBoxContainer({ o });
    })
  );
}

export default function Board() {
  // Track mouse crosshair position
  let MOUSE_X = 0;
  let MOUSE_Y = 0;

  return el(
    "div",
    {
      style: {
        border: "5px solid black",
        width: "calc(100% - 300px - 30px)",
        overflow: "hidden",
        position: "relative",
      },
      onmousemove: function (e) {
        const bounds = e.currentTarget.getBoundingClientRect();

        // console.log(
        //   `x: ${e.clientX - bounds.left}, y: ${e.clientY - bounds.top}`
        // );

        MOUSE_X = e.clientX;
        MOUSE_Y = e.clientY;
      },
      ondblclick: function () {
        console.log("CLICKED updated!", store.data.name);

        const newTextBox = new Text({
          selected: true,
          position: {
            top: MOUSE_Y + "px",
            left: MOUSE_X + "px",
          },
        });

        layer.add(newTextBox);

        store.update({});
      },
    },
    ObjectList()
  );
}
