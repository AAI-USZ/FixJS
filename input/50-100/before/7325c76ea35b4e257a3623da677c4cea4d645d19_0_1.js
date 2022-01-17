function() {
  var self = this;
  process.on('uncaughtException', function(err) {
    self.log('Airbrake: Uncaught exception, sending notification for:');
    self.log(err.stack);

    self.notify(err, function(notifyErr, url) {
      if (notifyErr) {
        self.log('Airbrake: Could not notify service.');
        self.log(notifyErr.stack);
      } else {
        self.log('Airbrake: Notified service: ' + url);
      }

      process.exit(1);
    });
  });
}