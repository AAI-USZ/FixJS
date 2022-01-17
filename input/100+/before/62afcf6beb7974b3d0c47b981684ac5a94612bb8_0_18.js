function(x) {
      var c_item, compiled, current_group, first, item, push_group, scope, _i, _len, _ref3;
      scope = last(scope_stack);
      current_group = [];
      compiled = [];
      push_group = function() {
        if (current_group.length) {
          compiled.push("[" + (current_group.join(', ')) + "]");
        }
        return current_group = [];
      };
      _ref3 = x.value;
      for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
        item = _ref3[_i];
        if (item instanceof types.UnquoteSpliced) {
          c_item = "Array.prototype.slice.call(" + (item._compile()) + ")";
          push_group();
          compiled.push(c_item);
        } else if (item instanceof types.Unquoted) {
          current_group.push(item._compile());
        } else {
          current_group.push(item._compile(true));
        }
      }
      push_group();
      first = compiled.shift();
      if (compiled.length) {
        return "" + first + ".concat(" + (compiled.join(', ')) + ")";
      } else {
        return first;
      }
    }