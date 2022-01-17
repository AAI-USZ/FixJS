function() {
  var self = this;
  var type = typeof this;

  if (!Array.isArray(this) && (type === "function" || type === "object")) {
    Object.keys(this).forEach(function(key) {
      if (self[key].type && self[key].type === "function") {
        self[key] = function () {};
      }

      validate.call(self[key]);
    });
  }

  return this;
}