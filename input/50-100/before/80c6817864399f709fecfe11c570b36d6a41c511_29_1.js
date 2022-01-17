function() {

    DistinctTimePeriod.name = 'DistinctTimePeriod';

    function DistinctTimePeriod(value) {
      this.date = Date.parse(value, 'yyyy-MM-ddTHH:mm:ss');
    }

    DistinctTimePeriod.prototype.next = function() {
      return this;
    };

    DistinctTimePeriod.prototype.toString = function() {
      return this.date.toString('yyyy-MM-ddTHH:mm:ss');
    };

    DistinctTimePeriod.prototype.toDate = function() {
      return this.date;
    };

    return DistinctTimePeriod;

  }