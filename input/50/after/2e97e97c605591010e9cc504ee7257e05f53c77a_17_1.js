function scm_dim() {
      if (!self._inTransition)
        return;

      screenBrightness -= 0.02;

      if (screenBrightness <= 0) {
        finish();
        return;
      }

      navigator.mozPower.screenBrightness = screenBrightness;
      setTimeout(dim, 10);
    }