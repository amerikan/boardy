let FAKE_ID = 1;

export default class Text {
  constructor({
    content = "Text",
    bounds = {
      height: "auto",
      width: "auto",
    },
    color = "black",
    size = "5em",
    position,
    weight = "normal",
    style = "normal",
  }) {
    this.id = FAKE_ID++;
    this.type = "TEXT";

    this.content = content;
    this.bounds = bounds;
    this.color = color;
    this.size = size;
    this.position = position;
    this.weight = weight;
    this.style = style;
  }
}
