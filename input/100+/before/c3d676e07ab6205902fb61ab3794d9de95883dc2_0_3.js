function() {
      var attribute, bindingRegExp, keypath, model, node, path, pipes, type, _i, _len, _ref, _results;
      this.bindings = [];
      bindingRegExp = this.bindingRegExp();
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
              type = attribute.name.replace(bindingRegExp, '');
              pipes = attribute.value.split('|').map(function(pipe) {
                return pipe.trim();
              });
              path = pipes.shift().split('.');
              model = this.models[path.shift()];
              keypath = path.join('.');
              _results1.push(this.bindings.push(new Rivets.Binding(node, type, model, keypath, pipes)));
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        }).call(this));
      }
      return _results;
    }