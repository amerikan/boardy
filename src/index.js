import App from "./ui/App";

import StoreObserver from "./store/app.observer";

export default class Boardy {
  constructor(selector) {
    this.$root = document.querySelector(selector);
  }

  mount() {
    this.render();

    StoreObserver.subscribe(() => {
      this.render();
    });
  }

  render() {
    const $root = this.$root;

    $root.innerHTML = "";

    $root.appendChild(App());
  }
}
