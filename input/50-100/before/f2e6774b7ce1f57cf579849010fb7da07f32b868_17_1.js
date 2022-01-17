function ti_end() {
    //TODO: ring too
    try {
      navigator.mozVibrate([200, 200, 200, 200, 200]);
    } catch (e) {}

    this.cancel();
    this.chronoView.parentNode.classList.add('ended');
  }