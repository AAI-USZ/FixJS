function() {
    /***
     * @method toString()
     * @returns String
     * @short Returns a string representation of the DateRange.
     * @example
     *
     *   Date.range(Date.create('2003'), Date.create('2005')).toString() -> January 1, 2003..January 1, 2005
     *
     ***/
    return this.isValid() ? this.start.full() + '..' + this.end.full() : 'Invalid DateRange';
  }