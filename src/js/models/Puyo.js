
export class Puyo {

  static types() {
    return {
      RED: "red",
      GREEN: "green",
      BLUE: "blue",
      YELLOW: "yellow"
    };
  }

  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  static createPuyo(x, y) {
    var types = Puyo.types(),
      keys = Object.keys(types),
      type = types[keys[keys.length * Math.random() << 0]];

    return new Puyo(x, y, type);
  }
}