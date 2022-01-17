function(param) {
        var name, params, _j, _len3, _ref3;
        if (param != null) {
          params = [];
          for (_j = 0, _len3 = param.length; _j < _len3; _j++) {
            _ref3 = param[_j], name = _ref3.name, type = _ref3.type;
            params.push("" + name + ":" + type);
          }
          return params.join(", ");
        } else {
          return "";
        }
      }