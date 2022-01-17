function() {
        if (foundIt)
          return;
        setTimeout(function() {
          viewThing.slice.refresh();
        }, 150);
      }