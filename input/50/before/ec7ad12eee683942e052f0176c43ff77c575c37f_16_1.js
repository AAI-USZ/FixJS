function transitionListener() {
      sprite.removeEventListener('transitionend', transitionListener);
      document.body.removeChild(sprite);
      if (callback)
        callback();
    }