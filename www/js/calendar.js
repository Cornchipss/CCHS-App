window.onload += function()
{
  let eventsList = document.getElementById("events-list");
  for(let i = 0; i < 31; i++)
  {
    eventsList.insertAdjacentHTML('beforeend',
    `
    <li>
      <div>
        <ul>
          <li>
            <span class="time">All Day</span>: Read Across America
          </li>
          <li>
            <span class="time">All Day</span>: PMEA Region V Chorus Festival
          </li>
          <li>
            <span class="time">6:00 PM</span>: CLSD Gold Card Event: CCHS Spring Musical, "Beauty & The Beast" Dress Rehersal
          </li>
        </ul>
      </div>
    </li>
    `);
  }
};

/*
<ol id="events-list">
  <li>
    <div>
      <ul>
        <li>
          <span class="time">All Day</span>: Read Across America
        </li>
        <li>
          <span class="time">All Day</span>: PMEA Region V Chorus Festival
        </li>
        <li>
          <span class="time">6:00 PM</span>: CLSD Gold Card Event: CCHS Spring Musical, "Beauty & The Beast" Dress Rehersal
        </li>
      </ul>
    </div>
  </li>
  <li>
*/
