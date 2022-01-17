function scm_setIdleTimeout(time) {
    if (!('addIdleObserver' in navigator))
      return;

    // Remove the original observer iif there is a previous observer
    // otherwise Gecko hit an assertion in debug mode.
    if (this.isIdleObserverInitialized) {
      navigator.removeIdleObserver(this.idleObserver);
    }

    // If time = 0, then there is no idle timeout to set.
    if (!time)
      return;

    this.idleObserver.time = time;
    navigator.addIdleObserver(this.idleObserver);
    this.isIdleObserverInitialized = true;
  }