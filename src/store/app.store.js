import Subject from "./app.observer";

class Store {
  constructor() {
    this.data = {
      name: "joe",
      age: 20,
    };
  }

  update(partialDataObject) {
    this.data = {
      ...this.data,
      ...partialDataObject,
    };

    Subject.notify();
  }
}

const store = new Store();

export default store;
