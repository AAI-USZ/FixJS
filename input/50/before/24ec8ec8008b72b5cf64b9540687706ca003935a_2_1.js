function vibrate() {
        if ('mozVibrate' in navigator) {
          navigator.mozVibrate([200]);
        }
      }