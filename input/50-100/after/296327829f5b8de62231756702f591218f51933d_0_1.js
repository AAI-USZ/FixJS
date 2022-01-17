function() {
        try {
          return ns.nanoTime() / 1e6;
        } catch(e) {
          try {
            ns = new applet.Packages.nano; // reinstantiate
            return ns.nanoTime() / 1e6;
          } catch(e) {
            // can this happen, after all this checking?
            return (new Date()).getTime();
          }
        }
      }