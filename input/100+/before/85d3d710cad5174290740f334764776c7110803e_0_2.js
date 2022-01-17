function() {
      var attribute, context, keypath, node, path, type, _i, _len, _ref, _results;
      this.bindings = [];
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
            if (/^data-/.test(attribute.name)) {
              type = attribute.name.replace('data-', '');
              path = attribute.value.split('.');
              context = this.contexts[path.shift()];
              keypath = path.join('.');
              _results1.push(this.bindings.push(new Rivets.Binding(node, type, context, keypath)));
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        }).call(this));
      }
      return _results;
    }