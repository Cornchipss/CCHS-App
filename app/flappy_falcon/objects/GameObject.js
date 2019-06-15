export default class GameObject
{
  static currentObjectId = 0;

  constructor(props)
  {
    this.props = props;
    if(props)
    {
      this.position = this.props.position || [0, 0];
      this.dimensions = this.props.dimensions || [0, 0];
    }

    this._id = GameObject.currentObjectId++;

    this.colliders = [];
    this.colliders.push({position: [0, 0], dimensions: this.dimensions})
  }

  render()
  {
    return (
      undefined
    );
  }

  touch(e) {}
  tick(engine) {}
  init(engine) {}

  collidingWith(obj)
  {
    if(!obj) return false;

    for(let i = 0; i < this.colliders.length; i++)
    {
      let me = this.colliders[i];

      for(let j = 0; j < obj.colliders.length; j++)
      {
        let them = obj.colliders[j];
        if(this.colliderPosition(me)[0] < obj.colliderPosition(them)[0] + them.dimensions[0])
        {
          if(this.colliderPosition(me)[0] + me.dimensions[0] > obj.colliderPosition(them)[0])
          {
            if(this.colliderPosition(me)[1] < obj.colliderPosition(them)[1] + them.dimensions[1])
            {
              if(this.colliderPosition(me)[1] + me.dimensions[1] > obj.colliderPosition(them)[1])
              {
                return true;
              }
            }
          }
        }
      }
    }

    return false;
  }

  get id () { return this._id; }

  colliderPosition(c)
  {
    return [this.position[0] + c.position[0], this.position[1] + c.position[1]];
  }
}
