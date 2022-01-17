function(e) {
        var selection;
        selection = null;
        ($('.xAxis_input')).each(function() {
          if (this.checked) {
            return selection = this.value;
          }
        });
        globals.xAxis = selection;
        return _this.update();
      }