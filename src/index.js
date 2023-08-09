import App from "./ui/App";

class Subject {
  constructor() {
    this.observers = [];
  }
  subscribe(func) {
    this.observers.push(func);
  }
  notify() {
    console.log("FIRED notify");

    this.observers.forEach((func) => {
      func();
    });
  }
}

export const store = new Subject();

export default class Boardy {
  constructor(selector) {
    this.$root = document.querySelector(selector);
  }

  mount() {
    this.render();

    store.subscribe(() => {
      this.render();
    });
  }

  render() {
    const $root = this.$root;

    $root.innerHTML = "";

    $root.appendChild(App());
  }
}
