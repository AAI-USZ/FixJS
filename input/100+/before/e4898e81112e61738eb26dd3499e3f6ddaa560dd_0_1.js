function (name, context, callback) {
    var value = context.lookup(name);

    switch (typeof value) {
    case "object":
      if (isArray(value)) {
        var buffer = "";
        for (var i = 0, len = value.length; i < len; ++i) {
          buffer += callback(context.push(value[i]), this);
        }
        return buffer;
      } else {
        if (value !== null) {
          return callback(context.push(value), this);
        }
      }
      break;
    case "function":
      var sectionText = callback(context, this), self = this;
      var scopedRender = function (template) {
        return self.render(template, context);
      };
      return value.call(context.view, sectionText, scopedRender) || "";
      break;
    case "number":
      return callback(context, this);
      break;
    default:
      if (value) {
        return callback(context, this);
      }
    }

    return "";
  }