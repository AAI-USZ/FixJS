function(e) {
          var key;
          if (e == null) return;
          key = e.which;
          _this.handleKeyPress(key);
          if (KEYSTATES[key] != null) clearTimeout(KEYSTATES[key]);
        }