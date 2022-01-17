function(o) {
    var items, key, type, value, _ref1;
    type = type_of(o);
    switch (type) {
      case "array":
        return C.List.prototype.toOppoString.call({
          value: o
        });
      case "object":
        if (o instanceof C.Construct) {
          return (_ref1 = typeof o.toOppoString === "function" ? o.toOppoString() : void 0) != null ? _ref1 : o.toString();
        } else {
          items = (function() {
            var _results;
            _results = [];
            for (key in o) {
              value = o[key];
              _results.push("" + (oppo.stringify(key)) + " " + (oppo.stringify(value)));
            }
            return _results;
          })();
          return "{ " + (items.join("\n")) + " }";
        }
        break;
      default:
        return "" + o;
    }
  }