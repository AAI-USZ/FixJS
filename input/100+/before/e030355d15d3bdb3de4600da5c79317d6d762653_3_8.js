function() {
            var _j, _len2, _ref, _ref2, _ref3, _results2;
            _ref = this._listeners;
            _results2 = [];
            for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
              _ref2 = _ref[_j], path = _ref2.path, event = _ref2.event, cb = _ref2.cb;
              if (pathEquals(path, match_path)) {
                switch (event) {
                  case 'insert':
                    if (c.li !== void 0 && c.ld === void 0) {
                      _results2.push(cb(c.p[c.p.length - 1], c.li));
                    } else if (c.oi !== void 0 && c.od === void 0) {
                      _results2.push(cb(c.p[c.p.length - 1], c.oi));
                    } else if (c.si !== void 0) {
                      _results2.push(cb(c.p[c.p.length - 1], c.si));
                    } else {
                      _results2.push(void 0);
                    }
                    break;
                  case 'delete':
                    if (c.li === void 0 && c.ld !== void 0) {
                      _results2.push(cb(c.p[c.p.length - 1], c.ld));
                    } else if (c.oi === void 0 && c.od !== void 0) {
                      _results2.push(cb(c.p[c.p.length - 1], c.od));
                    } else if (c.sd !== void 0) {
                      _results2.push(cb(c.p[c.p.length - 1], c.sd));
                    } else {
                      _results2.push(void 0);
                    }
                    break;
                  case 'replace':
                    if (c.li !== void 0 && c.ld !== void 0) {
                      _results2.push(cb(c.p[c.p.length - 1], c.ld, c.li));
                    } else if (c.oi !== void 0 && c.od !== void 0) {
                      _results2.push(cb(c.p[c.p.length - 1], c.od, c.oi));
                    } else {
                      _results2.push(void 0);
                    }
                    break;
                  case 'move':
                    if (c.lm !== void 0) {
                      _results2.push(cb(c.p[c.p.length - 1], c.lm));
                    } else {
                      _results2.push(void 0);
                    }
                    break;
                  case 'add':
                    if (c.na !== void 0) {
                      _results2.push(cb(c.na));
                    } else {
                      _results2.push(void 0);
                    }
                    break;
                  default:
                    _results2.push(void 0);
                }
              } else if ((common = this.type.commonPath(match_path, path)) != null) {
                if (event === 'child op') {
                  if ((match_path.length === (_ref3 = path.length) && _ref3 === common)) {
                    throw new Error("paths match length and have commonality, but aren't equal?");
                  }
                  child_path = c.p.slice(common + 1);
                  _results2.push(cb(child_path, c));
                } else {
                  _results2.push(void 0);
                }
              } else {
                _results2.push(void 0);
              }
            }
            return _results2;
          }