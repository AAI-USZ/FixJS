function completeFunc() {
        if (foundIt)
          return;
        setTimeout(function() {
          viewThing.slice.oncomplete = completeFunc;
          viewThing.slice.refresh();
        }, 150);
      }