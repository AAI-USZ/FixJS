function rv_init() {
    this.updateTime();
    this.ring();
    this.vibrate();
    document.addEventListener('mozvisibilitychange', this);
    document.getElementById('ring-btn-snooze').addEventListener('click', this);
    document.getElementById('ring-btn-close').addEventListener('click', this);
  }