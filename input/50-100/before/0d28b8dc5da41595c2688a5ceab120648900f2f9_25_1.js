function rv_init() {
    this.updateTime();
    document.addEventListener('mozvisibilitychange', this);
    document.getElementById('ring-btn-snooze').addEventListener('click', this);
    document.getElementById('ring-btn-close').addEventListener('click', this);
  }