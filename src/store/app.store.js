import { store as storeSubject } from "../index";

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

    storeSubject.notify();
  }
}

const store = new Store();

export default store;
