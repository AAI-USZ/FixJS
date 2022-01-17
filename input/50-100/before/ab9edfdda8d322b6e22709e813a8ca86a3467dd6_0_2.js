function (error, Resource) {
      if (error) return piccolo.emit('error', error);

      console.log(Resource);

      var presenter = new Resource(document, state.query.href);
          presenter[state.resolved.method].apply(presenter, state.resolved.args);
    }