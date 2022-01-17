function GregorianTimePeriod(format, year, month, day) {
      this.format = format;
      this.date = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    }