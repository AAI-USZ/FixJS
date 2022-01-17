function App(options) {
      if (options == null) {
        options = {
          router: new Tres.Router
        };
      }
      _.extend(this, options);
    }