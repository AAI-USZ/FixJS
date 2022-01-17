function () {
    // Source: http://www.timeanddate.com/worldclock/city.html?n=110
    // Changes every year!
    var dt;
    // 2008
    dt = timezoneJS.timezone.getTzInfo(parseISO('2008-03-28T01:59:59'), 'Asia/Jerusalem');
    expect(dt.tzOffset).toEqual(-120);
    dt = timezoneJS.timezone.getTzInfo(parseISO('2008-03-28T03:00:01'), 'Asia/Jerusalem');
    expect(dt.tzOffset).toEqual(-180);
    dt = timezoneJS.timezone.getTzInfo(parseISO('2008-10-05T00:59:59'), 'Asia/Jerusalem');
    expect(dt.tzOffset).toEqual(-180);
    dt = timezoneJS.timezone.getTzInfo(parseISO('2008-10-05T03:00:01'), 'Asia/Jerusalem');
    expect(dt.tzOffset).toEqual(-120);
    // 2009
    dt = timezoneJS.timezone.getTzInfo(parseISO('2009-03-27T01:59:59'), 'Asia/Jerusalem');
    expect(dt.tzOffset).toEqual(-120);
    dt = timezoneJS.timezone.getTzInfo(parseISO('2009-03-27T03:00:01'), 'Asia/Jerusalem');
    expect(dt.tzOffset).toEqual(-180);
    dt = timezoneJS.timezone.getTzInfo(parseISO('2009-09-27T00:59:59'), 'Asia/Jerusalem');
    expect(dt.tzOffset).toEqual(-180);
    dt = timezoneJS.timezone.getTzInfo(parseISO('2009-09-27T03:00:01'), 'Asia/Jerusalem');
    expect(dt.tzOffset).toEqual(-120);
  }