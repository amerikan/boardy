export default class Layer {
  constructor() {
    this.objects = [];
  }

  add(obj) {
    this.objects.push(obj);
  }

  remove(id) {
    const idx = this.objects.findIndex((o) => o.id === id);

    this.objects.splice(idx, 1);

    console.log(id, this.objects);
  }
}
