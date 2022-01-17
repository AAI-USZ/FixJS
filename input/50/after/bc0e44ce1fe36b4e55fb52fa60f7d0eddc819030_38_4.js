function() {
      models = {};
      // render out one model
      models[1] = {
        name: 'first',
        localDisplayed: true,
        _id: 'one'
      };

      store._cached = models;
      subject.render();
      children = subject.calendars.children;
    }