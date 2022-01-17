function scm_setIdleTimeout(time) {
    if (!('addIdleObserver' in navigator))
      return;
    navigator.removeIdleObserver(this.idleObserver);

    if (time === 0) {
      return;
    }

    this.idleObserver.time = time;
    navigator.addIdleObserver(this.idleObserver);
    this.isIdleObserverInitialized = true;
  }