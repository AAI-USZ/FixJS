function App(options) {
      if (options == null) {
        options = {
          router: new Tres.Router,
          device: new Tres.Device
        };
      }
      _.extend(this, options);
    }