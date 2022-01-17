function(event) {
        jumble = $(event.target).parents(".jumble");
        if (jumble.length) {
          return fimo.controller.wall("");
        }
      }