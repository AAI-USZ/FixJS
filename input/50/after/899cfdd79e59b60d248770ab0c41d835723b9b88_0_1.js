function topic(var_args) {
  var args = arguments.length ? asArray(arguments) : [undefined];
  return new Topic(args);
}