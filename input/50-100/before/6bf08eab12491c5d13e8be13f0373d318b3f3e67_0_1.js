function() {
  if (!run.currentRunLoop) {
    run.begin();

    if (!scheduledAutorun) {
      scheduledAutorun = setTimeout(autorun, 1);
    }
  }

  return run.currentRunLoop;
}