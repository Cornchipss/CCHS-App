import { Dimensions } from 'react-native';

import GameState from './GameState';
import GameHandler from '../GameHandler';
import { PIPE_DELAY_MS } from '../util/Reference';

import Ground from '../objects/Ground';
import Falcon from '../objects/Falcon';

export default class PlayingGameState extends GameState
{
  constructor(handler)
  {
    super(handler);

    this._objects = [];

    this._objects.push(new Ground(Dimensions.get('window').height - 112, this));
    this._objects.push(new Falcon(50, 112, this));
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

  touch()
  {
    this.objects.forEach((o, i, arr) =>
    {
      o.touch();
    });
  }

  get objects() { return this._objects; }
}
