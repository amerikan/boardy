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

export default new Subject();
