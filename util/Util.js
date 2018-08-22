import { Calendar, Event } from './Event';

const prettyDate = function(d: Date)
{
  return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
}

export { Calendar, Event, prettyDate };
