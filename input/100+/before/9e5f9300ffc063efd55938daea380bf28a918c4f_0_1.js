function Timer(sec) {
  this.msec = sec * 1000;
  this.start = new Date();
  console.log("start = " + this.start);

  this.getTime = function() {
    var now = new Date();
    return this.msec - Math.floor(now.getTime() - this.start.getTime());
  }

  this.getIntAbsTime = function() {
    return Math.abs(Math.ceil(this.getTime() / 1000));
  }

  this.getMin = function() {
    return Math.floor((this.getIntAbsTime() / 60) % 60);
  }

  this.getSec = function() {
    return Math.floor(this.getIntAbsTime() % 60);
  }

  this.getTimeString = function() {
    return ("0" + this.getMin()).substr(-2) + ":" + ("0" + this.getSec()).substr(-2);
  }

  this.getTimeStringMetrics = function(ctx) {
    return ctx.measureText("00:00");
  }
}