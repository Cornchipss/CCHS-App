import { Image as CanvasImage } from 'react-native-canvas';
import { ImageStore, Image as ReactImage } from 'react-native';

import spritesheet from './spritesheet.json';

export default class Sprite
{
  constructor(spriteName: string, w: int, h: int)
  {
    this._spriteName = spriteName;
    this._width = w;
    this._height = h;

    this._image = undefined;
    this._ready = false;
  }

  init(canvas)
  {
    this._image = new CanvasImage(canvas, this.width, this.height);

    this._image.width = this.width;
    this._image.height = this.height;

    const sprite = spritesheet[this.spriteName];
    if(sprite === undefined)
      throw new Error('Sprite "' + this.spriteName + '" not found in json file!');

    this._image.src = ' data:image/png;base64,' + sprite;
    this._image.addEventListener('load', () => this._ready = true);
  }

  render(ctx, x, y, w, h)
  {
    if(this.ready)
    {
      if(w && h)
        ctx.drawImage(this._image, x, y, w, h);
      else if(this.width && this.height)
        ctx.drawImage(this._image, x, y, this.width, this.height);
      else
        ctx.drawImage(this._image, x, y);
    }
  }

  get ready() { return this._ready; }

  get width() { return this._width; }
  get height() { return this._height; }

  get spriteName() { return this._spriteName; }
}
