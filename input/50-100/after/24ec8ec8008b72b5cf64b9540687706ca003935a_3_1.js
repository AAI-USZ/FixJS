function() {
    if (this.vibrate) {
      try {
        if (this.vibrate)
          navigator.vibrate(50);
      } catch (e) {}
    }

    if (this.clicksound) {
      this._audio.cloneNode(false).play();
    }
  }