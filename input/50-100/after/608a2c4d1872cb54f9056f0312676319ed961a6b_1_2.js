function TrueNamedArgument(name, arg) {
  this.arg = arg;
  this.text = arg ? arg.text : '--' + name;
  this.prefix = arg ? arg.prefix : ' ';
  this.suffix = arg ? arg.suffix : '';

  this.type = 'true';
}