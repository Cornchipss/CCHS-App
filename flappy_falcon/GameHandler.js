import { GameState } from './states/GameState';

export default class GameHandler
{
  constructor()
  {
    this._state = undefined;
  }

  tick()
  {
    if(this.state !== undefined)
      this.state.tick();
  }

  render(ctx)
  {
    if(this.state !== undefined)
      this.state.render(ctx);
  }

  get state() { return this._state; }
  set state(state: GameState) { this._state = state; }
}
