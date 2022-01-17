function(root, path, className, options) {
    var val = path !== '' ? getPath(root, path, options) : true;

    // If the value is truthy and we're using the colon syntax,
    // we should return the className directly
    if (!!val && className) {
      return className;

    // If value is a Boolean and true, return the dasherized property
    // name.
    } else if (val === true) {
      // Normalize property path to be suitable for use
      // as a class name. For exaple, content.foo.barBaz
      // becomes bar-baz.
      var parts = path.split('.');
      return Ember.String.dasherize(parts[parts.length-1]);

    // If the value is not false, undefined, or null, return the current
    // value of the property.
    } else if (val !== false && val !== undefined && val !== null) {
      return val;

    // Nothing to display. Return null so that the old class is removed
    // but no new class is added.
    } else {
      return null;
    }
  }