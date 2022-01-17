function() {
    var date = (this.source instanceof CronDate) ? this.source : new CronDate();
    if (this.zone && date.setTimezone)
      date.setTimezone(this.zone);
    
    //add 1 second so next time isn't now (can cause timeout to be 0)
    date.setSeconds(date.getSeconds() + 1);
    
    if (this.realDate) {
      return date;
    }
    return this._getNextDateFrom(date);
  }