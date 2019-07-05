import { Calendar, Event } from './Event';

import axios from 'axios';

const IP_LOCATION_API_KEY = '3f9e042c05985f52c258d964c0e77df9';

const prettyDate = function(d)
{
    return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
}

const getLocation = function()
{
    return new Promise((resolve, reject) =>
    {
        fetch('https://api.ipify.org/')
            .catch(ex => reject(ex))
            .then(res => 
            {
                res.text().then(userIp =>
                {
                    if(userIp !== '')
                    {
                        axios({ url: `http://api.ipstack.com/${userIp}?access_key=${IP_LOCATION_API_KEY}&output=json`, method: 'GET' })
                            .then(res =>
                            {
                                console.log(userIp);
                                let data = JSON.parse(res.request._response);
                            
                                resolve(data);
                            })
                            .catch(ex =>
                            {
                                reject(ex);
                            });
                    }
                    else
                        reject('Unable to get user ip');
                });
            });
    });
}

const days =
[
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
]

const miniDays =
[
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat'
]

const getDay = (date) =>
{
    return days[date.getDay()];
}

export { Calendar, Event, prettyDate, getLocation, days, miniDays, getDay };
