function() {
            var _j, _len1, _ref, _ref1, _ref2, _results1;
            _ref = this._listeners;
            _results1 = [];
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              _ref1 = _ref[_j], path = _ref1.path, event = _ref1.event, cb = _ref1.cb;
              if (pathEquals(path, match_path)) {
                switch (event) {
                  case 'insert':
                    if (c.li !== void 0 && c.ld === void 0) {
                      _results1.push(cb(c.p[c.p.length - 1], c.li));
                    } else if (c.oi !== void 0 && c.od === void 0) {
                      _results1.push(cb(c.p[c.p.length - 1], c.oi));
                    } else if (c.si !== void 0) {
                      _results1.push(cb(c.p[c.p.length - 1], c.si));
                    } else {
                      _results1.push(void 0);
                    }
                    break;
                  case 'delete':
                    if (c.li === void 0 && c.ld !== void 0) {
                      _results1.push(cb(c.p[c.p.length - 1], c.ld));
                    } else if (c.oi === void 0 && c.od !== void 0) {
                      _results1.push(cb(c.p[c.p.length - 1], c.od));
                    } else if (c.sd !== void 0) {
                      _results1.push(cb(c.p[c.p.length - 1], c.sd));
                    } else {
                      _results1.push(void 0);
                    }
                    break;
                  case 'replace':
                    if (c.li !== void 0 && c.ld !== void 0) {
                      _results1.push(cb(c.p[c.p.length - 1], c.ld, c.li));
                    } else if (c.oi !== void 0 && c.od !== void 0) {
                      _results1.push(cb(c.p[c.p.length - 1], c.od, c.oi));
                    } else {
                      _results1.push(void 0);
                    }
                    break;
                  case 'move':
                    if (c.lm !== void 0) {
                      _results1.push(cb(c.p[c.p.length - 1], c.lm));
                    } else {
                      _results1.push(void 0);
                    }
                    break;
                  case 'add':
                    if (c.na !== void 0) {
                      _results1.push(cb(c.na));
                    } else {
                      _results1.push(void 0);
                    }
                    break;
                  default:
                    _results1.push(void 0);
                }
              } else if ((common = this.type.commonPath(match_path, path)) != null) {
                if (event === 'child op') {
                  if ((match_path.length === (_ref2 = path.length) && _ref2 === common)) {
                    throw new Error("paths match length and have commonality, but aren't equal?");
                  }
                  child_path = c.p.slice(common + 1);
                  _results1.push(cb(child_path, c));
                } else {
                  _results1.push(void 0);
                }
              } else {
                _results1.push(void 0);
              }
            }
            return _results1;
          }