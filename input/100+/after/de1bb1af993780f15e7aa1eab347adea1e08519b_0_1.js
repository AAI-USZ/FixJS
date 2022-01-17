function CronTime(source, zone) {
  this.source = source;
  this.zone   = zone;

  this.second     = {};
  this.minute     = {};
  this.hour       = {};
  this.dayOfWeek  = {};
  this.dayOfMonth = {};
  this.month      = {};

  if ((this.source instanceof Date) || (this.source instanceof CronDate)) {
    this.source = new CronDate(this.source);
    this.realDate = true;
  } else {
    this._parse();
  }
}