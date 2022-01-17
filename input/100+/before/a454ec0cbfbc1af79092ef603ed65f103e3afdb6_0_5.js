function (writeTo, publicInterface, typeObject) {
      var target = descriptor.Static ? writeTo : writeTo.prototype;
      target[descriptor.EscapedName] = data.defaultValue = defaultValueExpression(publicInterface);
    }