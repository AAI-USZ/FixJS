function(date, day, month, year) {
      day = day || 0;
      month = month || 0;
      year = year || 0;

      return new Date(
        year || date.getFullYear(),
        month || date.getMonth(),
        day || date.getDate()
      );
    }