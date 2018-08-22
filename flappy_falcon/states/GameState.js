import GameHandler from '../GameHandler';

export default class GameState
{
  constructor(ctx: Object, handler: GameHandler)
  {
    this._handler = handler;
  }

  tick() {}
  render(ctx) {}
  init(canvas) {}

  get handler() { return this._handler; }
}
