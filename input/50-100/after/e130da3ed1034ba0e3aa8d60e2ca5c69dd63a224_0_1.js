function () {
      var date = new timezoneJS.Date();
      expect(date.toISOString()).toMatch(/[\d]{4}(-[\d]{2}){2}T([\d]{2}:){2}[\d]{2}.[\d]{3}/);
    }