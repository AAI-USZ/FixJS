function transitionListener(e) {
      var sprite = e.target;

      sprite.removeEventListener('transitionend', transitionListener);
      document.body.removeChild(sprite);

      currentlyClosing = false;

      if (callback)
        callback();
    }