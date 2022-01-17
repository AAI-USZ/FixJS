function loadMonitor(event) {
    event.target.removeEventListener('load');
    if (--loadCounter <= 0) {
      initialisationComplete();
    };
  }