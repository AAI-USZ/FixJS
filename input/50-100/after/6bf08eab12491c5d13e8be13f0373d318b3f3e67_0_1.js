function() {
  if (!run.currentRunLoop) {
    Ember.assert("You have turned on testing mode, which disabled the run-loop's autorun. You will need to wrap any code with asynchronous side-effects in an Ember.run", !Ember.testing);

    run.begin();

    if (!scheduledAutorun) {
      scheduledAutorun = setTimeout(autorun, 1);
    }
  }

  return run.currentRunLoop;
}