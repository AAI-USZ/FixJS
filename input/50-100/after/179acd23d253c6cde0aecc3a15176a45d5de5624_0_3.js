function(param) {
        var name, params, _k, _len2, _ref2;
        if (param != null) {
          params = [];
          for (_k = 0, _len2 = param.length; _k < _len2; _k++) {
            _ref2 = param[_k], name = _ref2.name, type = _ref2.type;
            params.push("" + name + ":" + type);
          }
          return params.join(', ');
        } else {
          return '';
        }
      }