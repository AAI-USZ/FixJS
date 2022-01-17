function ti_end() {
    //TODO: ring too
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 200, 200, 200, 200]);
    }

    this.cancel();
    this.chronoView.parentNode.classList.add('ended');
  }