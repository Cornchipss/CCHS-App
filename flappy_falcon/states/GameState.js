export default class GameState
{
  constructor(ctx, handler)
  {
    this._handler = handler;
  }

  tick() {}
  render(ctx) {}
  init(canvas) {}

  get handler() { return this._handler; }
}
