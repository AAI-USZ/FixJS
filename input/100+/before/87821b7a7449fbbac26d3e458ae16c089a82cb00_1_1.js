function(a, b, mismatchKeys, mismatchValues) {
  mismatchKeys = mismatchKeys || [];
  mismatchValues = mismatchValues || [];

  for (var i = 0; i < this.equalityTesters_.length; i++) {
    var equalityTester = this.equalityTesters_[i];
    var result = equalityTester(a, b, this, mismatchKeys, mismatchValues);
    if (result !== jasmine.undefined) return result;
  }

  if (a === b) return true;

  if (a === jasmine.undefined || a === null || b === jasmine.undefined || b === null) {
    return (a == jasmine.undefined && b == jasmine.undefined);
  }

  if (jasmine.isDomNode(a) && jasmine.isDomNode(b)) {
    return a === b;
  }

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() == b.getTime();
  }

  if (a instanceof jasmine.Matchers.Any) {
    return a.matches(b);
  }

  if (b instanceof jasmine.Matchers.Any) {
    return b.matches(a);
  }

  if (jasmine.isString_(a) && jasmine.isString_(b)) {
    return (a == b);
  }

  if (jasmine.isNumber_(a) && jasmine.isNumber_(b)) {
    return (a == b);
  }

  if (typeof a === "object" && typeof b === "object") {
    return this.compareObjects_(a, b, mismatchKeys, mismatchValues);
  }

  //Straight check
  return (a === b);
}