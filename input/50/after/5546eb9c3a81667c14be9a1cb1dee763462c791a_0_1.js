function loadMonitor(event) {
    event.target.removeEventListener('load', loadMonitor);
    if (--loadCounter <= 0) {
      initialisationComplete();
    };
  }