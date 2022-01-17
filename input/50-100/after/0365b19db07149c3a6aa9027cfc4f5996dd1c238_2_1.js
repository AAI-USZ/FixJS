function(action) {
      var _this = this;
      $(window).keydown(function(event) {
        if (event.keyCode === 83) {
          return action();
        }
      });
      return console.warn('Debug stepping is active. Press s to move a time step.');
    }