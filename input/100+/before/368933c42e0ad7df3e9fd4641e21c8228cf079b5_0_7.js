function() {
      window.clearInterval(looping);

      removeInstance(p.externals.canvas.id);

      // Step through the libraries to detach them
      for (var lib in Processing.lib) {
        if (Processing.lib.hasOwnProperty(lib)) {
          if (Processing.lib[lib].hasOwnProperty("detach")) {
            Processing.lib[lib].detach(p);
          }
        }
      }

      var i = eventHandlers.length;
      while (i--) {
        detachEventHandler(eventHandlers[i]);
      }
      curSketch.onExit();
    }