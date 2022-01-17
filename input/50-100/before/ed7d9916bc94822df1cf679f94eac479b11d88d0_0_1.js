function (name) {
  if (name.match(/^\w+:/)) return name;

  var matches = name.match(/^\/(\w*)\/(\w+)$/);

  if (! matches)
    throw "couldn't understand type name '" + name + "'";

  if (! this.prefix_registry[ matches[1] ])
    throw "unknown prefix '" + matches[1] + "' in type name '" + name + "'";

  return this.prefix_registry[ matches[1] ] + matches[2];
}