import GameObject from './GameObject';
import Sprite from '../sprites/Sprite';
// import Type from './Type';

const MAX_SPEED = 2;

export default class Falcon extends GameObject
{
  constructor(x: int, y: int, state: GameState)
  {
    super(x, y, 34, 24, state);

    this.sprite = new Sprite('falcon-0', this.width, this.height);

    this._velocity = 0;
  }

  render(ctx)
  {
    this.sprite.render(ctx, this.x, this.y);
  }

  tick()
  {
    if(this._velocity > -MAX_SPEED)
      this._velocity -= 1;

    if(this.state.objects !== undefined)
    {
      for(let i = 0; i < this.state.objects.length; i++)
      {
        const obj = this.state.objects[i];
        if(obj !== this)
        {
          if(this.collidingWith(obj))
          {
            // if(obj.type === Type.KILL)
            // {
            //   this.die();
            // }
            // else
            // {
              while(this.collidingWith(obj))
              {
                this.y -= Math.sign(this.velocity);
              }
            // }
          }
        }
      }
    }

    this.y -= this.velocity;
  }

  die()
  {
    console.log('ded');
  }

  touch()
  {
    this._velocity = 10 * MAX_SPEED;
  }

  get velocity() { return this._velocity; }
}
