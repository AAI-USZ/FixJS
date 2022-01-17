function() {
        try {
            return ns.nanoTime() / 1e6;
        } catch(e) {
            ns = new applet.Packages.nano; // reinstantiate
            return ns.nanoTime() / 1e6;
        }
      }