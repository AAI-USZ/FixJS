function CronJob(cronTime, onTick, onComplete, start, timeZone) {
  if (typeof cronTime != "string" && arguments.length == 1) {
    //crontime is an object...
    onTick = cronTime.onTick;
    onComplete = cronTime.onComplete;
    start = cronTime.start;
    cronTime = cronTime.cronTime;
    timeZone = cronTime.timeZone;
  }

  if (timeZone && !(CronDate.prototype.setTimezone)) console.log('You specified a Timezone but have not included the `time` module. Timezone functionality is disabled. Please install the `time` module to use Timezones in your application.');

  this._callbacks = [];
  this.onComplete = onComplete;
  this.cronTime   = new CronTime(cronTime, timeZone);

  this.addCallback(onTick);

  if (start) this.start();

  return this;
}