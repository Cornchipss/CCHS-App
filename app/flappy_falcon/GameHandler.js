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

  touch()
  {
    this.state.touch();
  }

  get state() { return this._state; }
  set state(state) { this._state = state; }
}
