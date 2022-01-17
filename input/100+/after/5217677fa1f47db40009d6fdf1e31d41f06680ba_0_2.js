function(longitude, latitude, landiness) {
        var now, sunSet;
        now = new Date();
        sunSet = new SunriseSunset(now.getYear(), now.getMonth() + 1, now.getDate(), latitude, longitude);
        if (sunSet.isDaylight(now.getHours()) || latitude >= 69) {
          return this.dotRadius * Math.max(0.2, landiness) * 0.6;
        } else {
          return this.dotRadius * Math.max(0.25, landiness) * 0.78;
        }
      }