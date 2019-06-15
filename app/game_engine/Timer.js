export default class Timer
{
  constructor(tps)
  {
    this.tps = tps;
    this.subscribers = [];
  }

  start()
  {
    this.timer = setInterval(() =>
    {
      this.subscribers.forEach(callback =>
      {
        callback();
      })
    }, this.tps / 1000.0 );
  }

  stop()
  {
    clearInterval(this.timer);
  }

  clearSubscribers()
  {
    while(this.subscribers.length != 0)
      this.subscribers.pop();
  }

  subscribe(callback)
  {
    this.subscribers.push(callback);
  }
}
