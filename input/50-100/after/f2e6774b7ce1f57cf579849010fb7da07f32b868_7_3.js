function(date, day, month, year) {
      return new Date(
        year || date.getFullYear(),
        month || date.getMonth(),
        day || date.getDate()
      );
    }