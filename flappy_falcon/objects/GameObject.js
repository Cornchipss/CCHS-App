export default class GameObject
{
  constructor(x: int, y: int, w: int, h: int, state: GameState)
  {
    this._sprite = undefined;
    this._x = x;
    this._y = y;
    this._width = w;
    this._height = h;
    this._state = state;
  }

  tick() {}
  render() {}
  touch() {}

  collidingWith(obj: GameObject)
  {
    return (obj.x + obj.width  > this.x && obj.x < this.x + this.width) &&
           (obj.y + obj.height > this.y && obj.y < this.y + this.height);
  }

  // Getters & Setters //

  get sprite() { return this._sprite; }
  set sprite(s: Sprite) { this._sprite = s; }

  get x() { return this._x; }
  set x(x: int) { this._x = x; }

  get y() { return this._y; }
  set y(y: int) { this._y = y; }

  get width() { return this._width; }
  get height() { return this._height; }

  get state() { return this._state; }
}
