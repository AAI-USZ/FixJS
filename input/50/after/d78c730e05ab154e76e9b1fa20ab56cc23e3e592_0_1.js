function(d) {
        window.ellipsis.stop();
        return $('#waiting').fadeOut(function() {
          return $('#download').fadeIn();
        });
      }