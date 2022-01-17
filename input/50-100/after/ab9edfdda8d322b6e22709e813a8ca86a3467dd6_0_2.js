function (error, Resource) {
      if (error) return piccolo.emit('error', error);

      var presenter = new Resource(state.query.href, document);
          presenter[state.resolved.method].apply(presenter, state.resolved.args);
    }