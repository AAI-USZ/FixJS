function () {
      var zones = timezoneJS.timezone.getAllZones();
      for (var i = 0; i < zones; i++) {
        expect(zones[i]).not.toBe(null);
      }
    }