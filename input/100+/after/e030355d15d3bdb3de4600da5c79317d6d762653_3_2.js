function(snapshot, op) {
    var c, container, e, elem, i, key, p, parent, parentkey, _i, _j, _len, _len1, _ref;
    json.checkValidOp(op);
    op = clone(op);
    container = {
      data: clone(snapshot)
    };
    try {
      for (i = _i = 0, _len = op.length; _i < _len; i = ++_i) {
        c = op[i];
        parent = null;
        parentkey = null;
        elem = container;
        key = 'data';
        _ref = c.p;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          p = _ref[_j];
          parent = elem;
          parentkey = key;
          elem = elem[key];
          key = p;
          if (parent == null) {
            throw new Error('Path invalid');
          }
        }
        if (c.na !== void 0) {
          if (typeof elem[key] !== 'number') {
            throw new Error('Referenced element not a number');
          }
          elem[key] += c.na;
        } else if (c.si !== void 0) {
          if (typeof elem !== 'string') {
            throw new Error("Referenced element not a string (it was " + (JSON.stringify(elem)) + ")");
          }
          parent[parentkey] = elem.slice(0, key) + c.si + elem.slice(key);
        } else if (c.sd !== void 0) {
          if (typeof elem !== 'string') {
            throw new Error('Referenced element not a string');
          }
          if (elem.slice(key, key + c.sd.length) !== c.sd) {
            throw new Error('Deleted string does not match');
          }
          parent[parentkey] = elem.slice(0, key) + elem.slice(key + c.sd.length);
        } else if (c.li !== void 0 && c.ld !== void 0) {
          json.checkList(elem);
          elem[key] = c.li;
        } else if (c.li !== void 0) {
          json.checkList(elem);
          elem.splice(key, 0, c.li);
        } else if (c.ld !== void 0) {
          json.checkList(elem);
          elem.splice(key, 1);
        } else if (c.lm !== void 0) {
          json.checkList(elem);
          if (c.lm !== key) {
            e = elem[key];
            elem.splice(key, 1);
            elem.splice(c.lm, 0, e);
          }
        } else if (c.oi !== void 0) {
          json.checkObj(elem);
          elem[key] = c.oi;
        } else if (c.od !== void 0) {
          json.checkObj(elem);
          delete elem[key];
        } else {
          throw new Error('invalid / missing instruction in op');
        }
      }
    } catch (error) {
      throw error;
    }
    return container.data;
  }