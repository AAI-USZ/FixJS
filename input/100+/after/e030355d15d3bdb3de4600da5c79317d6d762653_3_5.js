function(snapshot, path) {
    var container, elem, key, p, _i, _len;
    container = {
      data: snapshot
    };
    key = 'data';
    elem = container;
    for (_i = 0, _len = path.length; _i < _len; _i++) {
      p = path[_i];
      elem = elem[key];
      key = p;
      if (typeof elem === 'undefined') {
        throw new Error('bad path');
      }
    }
    return {
      elem: elem,
      key: key
    };
  }