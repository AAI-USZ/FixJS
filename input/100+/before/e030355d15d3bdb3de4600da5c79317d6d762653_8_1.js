function(op) {
    var c, last, _i, _len, _results;
    if (!Array.isArray(op)) throw new Error('Op must be an array of components');
    last = null;
    _results = [];
    for (_i = 0, _len = op.length; _i < _len; _i++) {
      c = op[_i];
      if (typeof c === 'object') {
        if (c.i !== void 0) {
          if (!((typeof c.i === 'string' && c.i.length > 0) || (typeof c.i === 'number' && c.i > 0))) {
            throw new Error('Inserts must insert a string or a +ive number');
          }
        } else if (c.d !== void 0) {
          if (!(typeof c.d === 'number' && c.d > 0)) {
            throw new Error('Deletes must be a +ive number');
          }
        } else {
          throw new Error('Operation component must define .i or .d');
        }
      } else {
        if (typeof c !== 'number') {
          throw new Error('Op components must be objects or numbers');
        }
        if (!(c > 0)) throw new Error('Skip components must be a positive number');
        if (typeof last === 'number') {
          throw new Error('Adjacent skip components should be combined');
        }
      }
      _results.push(last = c);
    }
    return _results;
  }