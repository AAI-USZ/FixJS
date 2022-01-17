function(error, over) {
        var _this = this;
        Log.error("Net error [" + (this.getName()) + "]: " + error + " " + error.stack);
        return this.consoleBuffer.addEvent({
          type: 'error',
          msg: error
        }, function() {
          _this.disconnect();
          return over();
        });
      }