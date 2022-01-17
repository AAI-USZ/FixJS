function(d) {
        Window.ellipsis.stop();
        return $('#waiting').fadeOut(function() {
          return $('#download').fadeIn();
        });
      }