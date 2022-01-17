function(e) {
            e.preventDefault();
            reset();
            setup();
            $(this).blur();
      }).resizable({ aspectRatio: true  }