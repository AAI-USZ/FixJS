function(key, value) {
  var parentView;

  if (arguments.length === 2) {
    return value;
  } else {
    parentView = get(this, 'parentView');
    return parentView ? get(parentView, 'controller') : null;
  }
}