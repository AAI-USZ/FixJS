function() {

    GregorianTimePeriod.name = 'GregorianTimePeriod';

    function GregorianTimePeriod(format, year, month, day) {
      this.format = format;
      this.date = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    }

    GregorianTimePeriod.prototype.next = function() {
      switch (this.format) {
        case 'GY':
          this.date.addYears(1);
          break;
        case 'GTM':
          this.date.addMonths(1);
          break;
        case 'GD':
          this.date.addDays(1);
      }
      return this;
    };

    GregorianTimePeriod.prototype.toString = function() {
      switch (this.format) {
        case 'GY':
          return this.date.toString('yyyy');
        case 'GTM':
          return this.date.toString('yyyy-MM');
        case 'GD':
          return this.date.toString('yyyy-MM-dd');
      }
    };

    GregorianTimePeriod.prototype.toDate = function() {
      return this.date;
    };

    return GregorianTimePeriod;

  }