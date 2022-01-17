function(longitude, latitude, landiness) {
        var darkness, idx, landColors, now, sunSet;
        darkness = landiness * landiness;
        now = new Date();
        sunSet = new SunriseSunset(now.getYear(), now.getMonth() + 1, now.getDate(), latitude, longitude);
        landColors = this.colors.land.day(this);
        idx = Math.floor(darkness * (landColors.length - 2));
        if (sunSet.isDaylight(now.getHours()) || latitude >= 69) {
          return new Color(landColors[idx]);
        } else {
          return new Color(landColors[idx + 1]);
        }
      }