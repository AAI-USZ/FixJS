function(path) {
  var context;
  context = soma.load(path, true);
  return function(event) {
    history.pushState({}, '', path);
    context.render();
    if (event) {
      event.stop();
    }
  };
}