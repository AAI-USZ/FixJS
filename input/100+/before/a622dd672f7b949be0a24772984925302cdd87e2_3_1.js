function(arg) {
  if (arg.text.replace(/\s/g, '').length === 0) {
    return new Conversion(undefined, arg, Status.INCOMPLETE, '');
  }

  var value = parseInt(arg.text, 10);
  if (isNaN(value)) {
    return new Conversion(undefined, arg, Status.ERROR,
        l10n.lookupFormat('typesNumberNan', [ arg.text ]));
  }

  var max = this.getMax();
  if (max != null && value > max) {
    return new Conversion(undefined, arg, Status.ERROR,
        l10n.lookupFormat('typesNumberMax', [ value, max ]));
  }

  var min = this.getMin();
  if (min != null && value < min) {
    return new Conversion(undefined, arg, Status.ERROR,
        l10n.lookupFormat('typesNumberMin', [ value, min ]));
  }

  return new Conversion(value, arg);
}