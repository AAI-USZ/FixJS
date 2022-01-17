function(e) {
        if (_this.getConfigFromLocalStorage()) {
          localStorage.removeItem(_this.localStorageKey);
          return window.location = "/";
        }
      }