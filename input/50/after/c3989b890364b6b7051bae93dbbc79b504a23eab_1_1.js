function() {
    mocknow(interval * ++i);
    run();
    if (i === n) {
      clearInterval(iid);
      if (typeof callback === 'function') process.nextTick(callback);
    }
  }