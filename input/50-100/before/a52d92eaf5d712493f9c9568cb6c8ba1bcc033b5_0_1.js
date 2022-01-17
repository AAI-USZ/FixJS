function nextAdaptive () {
    count++;
    if (!--pending) {
      var elapsed = timer.stop().elapsed;
      if (elapsed < duration) {
        var add = Math.round(count * (duration / (elapsed + 1)));
        pending = add;
        run();
      } else {
        onFinish(elapsed);
      }
    }
  }