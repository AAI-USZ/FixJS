function () {
      // Source: http://www.timeanddate.com/worldclock/clockchange.html?n=233
      // Standard: GMT-3 from Feb 16 - Nov 1
      // Daylight: GMT-2 from Nov 2 - Feb 16
      var dt;
      // 2008
      //dt = timezoneJS.timezone.getTzInfo(parseISO('2008-02-16-02:00'), 'America/Sao_Paulo');
      //expect(120, dt.tzOffset);
      dt = timezoneJS.timezone.getTzInfo(parseISO('2008-02-17'), 'America/Sao_Paulo');
      expect(dt.tzOffset).toEqual(180);
      dt = timezoneJS.timezone.getTzInfo(parseISO('2008-10-11'), 'America/Sao_Paulo');
      expect(dt.tzOffset).toEqual(180);
      dt = timezoneJS.timezone.getTzInfo(parseISO('2008-10-19'), 'America/Sao_Paulo');
      expect(dt.tzOffset).toEqual(120);
    }