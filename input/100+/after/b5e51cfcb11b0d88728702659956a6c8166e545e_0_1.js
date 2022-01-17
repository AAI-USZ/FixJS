function() {
      var attribute, bindType, bindingRegExp, eventRegExp, keypath, model, node, path, pipe, pipes, type, _i, _len, _ref, _results;
      this.bindings = [];
      bindingRegExp = this.bindingRegExp();
      eventRegExp = /^on-/;
      _ref = this.el.getElementsByTagName('*');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        _results.push((function() {
          var _j, _len1, _ref1, _results1;
          _ref1 = node.attributes;
          _results1 = [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            attribute = _ref1[_j];
            if (bindingRegExp.test(attribute.name)) {
              bindType = "attribute";
              type = attribute.name.replace(bindingRegExp, '');
              pipes = (function() {
                var _k, _len2, _ref2, _results2;
                _ref2 = attribute.value.split('|');
                _results2 = [];
                for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
                  pipe = _ref2[_k];
                  _results2.push(pipe.trim());
                }
                return _results2;
              })();
              path = pipes.shift().split('.');
              model = this.models[path.shift()];
              keypath = path.join('.');
              if (eventRegExp.test(type)) {
                type = type.replace(eventRegExp, '');
                bindType = "event";
              } else if (__indexOf.call(bidirectionals, type) >= 0) {
                bindType = "bidirectional";
              }
              _results1.push(this.bindings.push(new Rivets.Binding(node, type, bindType, model, keypath, pipes)));
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        }).call(this));
      }
      return _results;
    }