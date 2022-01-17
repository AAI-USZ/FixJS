function NamedArgument(nameArg, valueArg) {
  this.nameArg = nameArg;
  this.valueArg = valueArg;

  if (valueArg == null) {
    this.text = '';
    this.prefix = nameArg.toString();
    this.suffix = '';
  }
  else {
    this.text = valueArg.text;
    this.prefix = nameArg.toString() + valueArg.prefix;
    this.suffix = valueArg.suffix;
  }

  this.type = 'named';
}