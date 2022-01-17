function transitionListener() {
      sprite.removeEventListener('transitionend', transitionListener);
      document.body.removeChild(sprite);

      currentlyClosing = false;

      if (callback)
        callback();
    }