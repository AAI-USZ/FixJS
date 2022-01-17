function(value) {
  if (this.ppNestLevel_ > 40) {
    throw new Error('jasmine.PrettyPrinter: format() nested too deeply!');
  }

  this.ppNestLevel_++;
  try {
    if (value === jasmine.undefined) {
      this.emitScalar('undefined');
    } else if (value === null) {
      this.emitScalar('null');
    } else if (value === jasmine.getGlobal()) {
      this.emitScalar('<global>');
    } else if (value instanceof jasmine.Matchers.Any) {
      this.emitScalar(value.toString());
    } else if (typeof value === 'string') {
      this.emitString(value);
    } else if (jasmine.isSpy(value)) {
      this.emitScalar("spy on " + value.identity);
    } else if (value instanceof RegExp) {
      this.emitScalar(value.toString());
    } else if (typeof value === 'function') {
      this.emitScalar('Function');
    } else if (typeof value.nodeType === 'number') {
      this.emitScalar('HTMLNode');
    } else if (value instanceof Date) {
      this.emitScalar('Date(' + value + ')');
    } else if (value.__Jasmine_been_here_before__) {
      this.emitScalar('<circular reference: ' + (jasmine.isArray_(value) ? 'Array' : 'Object') + '>');
    } else if (jasmine.isArray_(value) || typeof value == 'object') {
      value.__Jasmine_been_here_before__ = true;
      if (jasmine.isArray_(value)) {
        this.emitArray(value);
      } else {
        this.emitObject(value);
      }
      delete value.__Jasmine_been_here_before__;
    } else {
      this.emitScalar(value.toString());
    }
  } finally {
    this.ppNestLevel_--;
  }
}