function() {

    ReportingTimePeriod.name = 'ReportingTimePeriod';

    function ReportingTimePeriod(frequency, year, period) {
      this.frequency = frequency;
      this.year = year;
      this.period = period;
    }

    ReportingTimePeriod.prototype.limitPerYear = function() {
      switch (this.frequency) {
        case 'A':
          return 1;
        case 'S':
          return 2;
        case 'T':
          return 3;
        case 'Q':
          return 4;
        case 'M':
          return 12;
        case 'W':
          return +(new Date(Date.UTC(this.year, 11, 28))).getISOWeek();
        case 'D':
          if (Date.isLeapYear(this.year)) {
            return 366;
          } else {
            return 365;
          }
      }
    };

    ReportingTimePeriod.prototype.next = function() {
      var limit;
      limit = this.limitPerYear();
      this.year += (this.period === limit ? 1 : 0);
      this.period = (this.period === limit ? 1 : this.period + 1);
      return this;
    };

    ReportingTimePeriod.prototype.paddedPeriod = function() {
      var pad, str;
      str = '' + this.period;
      pad = (function() {
        switch (this.frequency) {
          case 'A':
          case 'S':
          case 'T':
          case 'Q':
            return '0';
          case 'M':
          case 'W':
            return '00';
          case 'D':
            return '000';
        }
      }).call(this);
      return pad.substr(0, pad.length - str.length) + str;
    };

    ReportingTimePeriod.prototype.toString = function() {
      return "" + this.year + "-" + this.frequency + (this.paddedPeriod());
    };

    ReportingTimePeriod.prototype.toDate = function() {
      var date;
      date = new Date(Date.UTC(year, 0, 1, 0, 0, 0));
      switch (this.frequency) {
        case 'A':
          return date;
        case 'S':
          return date.addMonths(6 * (this.period - 1));
        case 'T':
          return date.addMonths(4 * (this.period - 1));
        case 'Q':
          return date.addMonths(3 * (this.period - 1));
        case 'M':
          return date.addMonths(this.period - 1);
        case 'W':
          return date.addWeeks(this.period - 1);
        case 'D':
          return date.addDays(this.period - 1);
      }
    };

    return ReportingTimePeriod;

  }