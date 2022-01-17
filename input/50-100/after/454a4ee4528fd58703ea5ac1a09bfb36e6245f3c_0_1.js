function(message) {
        var error,
          _this = this;
        this.flash.append(error = new ErrorView({
          message: message
        }));
        return window.setTimeout((function() {
          return error.$(".alert").alert('close');
        }), 2000);
      }