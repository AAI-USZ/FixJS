function(event) {
          if (!_this.options.command) {
            return;
          }
          try {
            return _this.checked(document.queryCommandState(_this.options.command));
          } catch (e) {

          }
        }