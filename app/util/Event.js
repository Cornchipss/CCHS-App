/**
 * Holds a specific event's data to be used later
 */
class Event
{
  /**
   * Holds a specific event's data to be used later
   * @param {Date} begin    The date the event begins on
   * @param {Date} end      The date the event ends on
   * @param {string} title    The title of the event
   * @param {string} category The category of the event
   */
  constructor(begin, end, title, category)
  {
    this._begin = begin;
    this._end = end;
    this._title = title;
    this._category = category;
  }

  get begin() { return this._begin; }
  set begin(begin) { this._begin = begin; }

  get end() { return this._end; }
  set end(e) { this._end = e; }

  get title() { return this._title; }
  set title(t) { this._title = t; }

  get category() { return this._category; }
  set category(c) { this._category = c; }

  /**
   * Checks if the event is happening on a supplied date.
   * @param  {Date}  date The date to see if the event takes place on.
   * @return {Boolean} true if it takes place on said date, false if not.
   */
  isOnDay(date)
  {
    return this.begin <= date && this.end >= date;
  }

  /**
   * This converts the school color codes into actual category names
   * Because for some reason, having an actual name is too hard, so they store it in a color.
   * @param  {string} color The stupid color to parse (make sure to include the # at the start. E.g: #000000)
   * @return {string}       The actual category name that should have been there instead of a stupid color
   */
  static getCategory(color)
  {
    // Gotten from school website, so if they break blame them.
    switch(color.toLowerCase())
    {
      case '#1882ed':
        return 'Testing';
      case '#cda220':
        return 'Act 80 Day';
      case '#eded00':
        return 'Assembly';
      case '#00a000':
        return 'Athletic Event';
      case '#96dc24':
        return 'Athletic Practice';
      case '#4b10af':
        return 'Building Event';
      case '#ef0078':
        return 'Holiday';
      case '#e301ed':
        return 'In-Service Day';
      case '#ef001b':
        return 'Musical or Art Event';
      case '#6f0374':
        return 'Off-Site Event';
      case '#ee68f4':
        return 'Parent Teacher Conference';
      case '#6716ef':
        return 'PTO/PTA Meeting';
      case '#ed7700':
        return 'School Board Meeting';
      case '#a779f5':
        return 'Staff Meeting';
      default:
        return 'Miscellaneous';
    }
  }
};

class Calendar
{
  /**
   * Stores the events and start/end dates of a calendar
   * @param {Date} s Start date of calendar
   * @param {Date} e End date of calendar
   * @param {Event[]} evts The events the calendar consists of
   */
  constructor(s, e, evts)
  {
    if(arguments.length === 3)
    {
      this._events = evts; // Clones the array
      this._end = new Date(s);
      this._title = new Date(s);
    }
    else
    {
      this._events = [];
      this._start = s;
      this._end = e;
    }
  }

  /**
   * Adds an event to the calendar's list of events
   * @param {Event} e The event to add
   */
  addEvent(e) { this.events.push(e); }

  /**
   * Returns every event that takes place on a given date
   * @param  {Date} date The day to find events that take place on it
   * @return {Event[]} Each event that takes place on that day
   */
  getEventsOn(date)
  {
    let evts = [];
    for(let i = 0; i < this.events.length; i++)
      if(this.events[i].isOnDay(date))
        evts.push(this.events[i]);
    return evts;
  }

  get start() { return this._start; }
  get events() { return this._events; }
  get end() { return this._end; }
};

export { Calendar, Event };
