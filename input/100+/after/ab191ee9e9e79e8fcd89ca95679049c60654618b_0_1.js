function (pattern, value, reverse) {
  var i, I, j, J, by, pipeline, parameters, transform;
  // Run the piplines for parsing.
  if (pipeline = pattern.pipeline) {
    if (reverse) {
      i = pipeline.length - 1, I = -1, by = -1;
    } else {
      i = 0, I = pipeline.length; by = 1;
    }
    while (i != I) {
      transform = pipeline[i];
      parameters = [];
      for (j = 0, J = transform.parameters.length; j < J; j++) {
        parameters.push(transform.parameters[j].constant)
      }
      parameters.push(! this._outgoing, pattern, value);
      value = this._transforms[transform.name].apply(null, parameters);
      i += by;
    }
  }
  return value;
}