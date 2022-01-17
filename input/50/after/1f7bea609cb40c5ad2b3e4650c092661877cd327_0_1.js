function(e) {
        if (e && _this.getConfigFromLocalStorage()) {
          localStorage.removeItem(_this.localStorageKey);
          return window.location = "/";
        }
      }