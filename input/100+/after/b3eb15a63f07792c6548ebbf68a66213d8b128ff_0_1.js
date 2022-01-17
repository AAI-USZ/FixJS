function(path) {
  var context;
  if (history.pushState) {
    context = soma.load(path, true);
    return function(event) {
      history.pushState({}, '', context.path);
      context.render();
      if (event) {
        event.stop();
      }
    };
  } else {
    return function(event) {
      if (this.pathname !== path) {
        document.location = path;
        if (event) {
          return event.stop();
        }
      }
    };
  }
}