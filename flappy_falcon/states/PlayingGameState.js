import { Dimensions } from 'react-native';

import GameState from './GameState';
import GameHandler from '../GameHandler';
import { PIPE_DELAY_MS } from '../util/Reference';

import Ground from '../objects/Ground';

export default class PlayingGameState extends GameState
{
  constructor(handler: GameHandler)
  {
    super(handler);

    this._objects = [];

    this._objects.push(new Ground(Dimensions.get('window').height - 112));
  }

  tick()
  {
    this.objects.forEach((o, index, arr) => o.tick());
  }

  render(ctx)
  {
    this.objects.forEach((o, index, arr) => o.render(ctx));
  }

  init(canvas)
  {
    this.objects.forEach((o, index, arr) =>
    {
      if(o.sprite)
        o.sprite.init(canvas);
    });
  }

  get objects() { return this._objects; }
}
