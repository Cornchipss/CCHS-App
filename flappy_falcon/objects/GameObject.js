export default class GameObject
{
  constructor(x: int, y: int)
  {
    this._sprite = undefined;
    this._x = x;
    this._y = y;
  }

  tick() {}
  render() {}

  // Getters & Setters //

  get sprite() { return this._sprite; }
  set sprite(s: Sprite) { this._sprite = s; }

  get x() { return this._x; }
  set x(x: int) { this._x = x; }

  get y() { return this._y; }
  set y(y: int) { this._y = y; }

  get width() { return this._sprite.getWidth(); }
  get height() { return this._sprite.getHeight(); }
}
