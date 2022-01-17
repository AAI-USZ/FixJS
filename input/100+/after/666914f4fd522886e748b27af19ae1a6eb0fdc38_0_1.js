function (body) {
  if(!this.properties) return {};

  var sanitized = {}
    , props = this.properties
    , keys = Object.keys(props);

  keys.forEach(function (key) {
    var prop = props[key]
    , expected = prop.type
    , val = body[key]
    , actual = typeof val;

    // skip properties that do not exist
    if(!prop) return;

    if(expected == actual) {
      sanitized[key] = val;
    } else if(expected == 'number' && actual == 'string') {
      sanitized[key] = parseInt(val);
    }
  });

  return sanitized;
}