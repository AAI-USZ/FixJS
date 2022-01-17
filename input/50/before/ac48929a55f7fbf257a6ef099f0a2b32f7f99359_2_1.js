function(obj) {
      return this.isValid() ? this.start.full() + '..' + this.end.full() : 'Invalid DateRange';
    }