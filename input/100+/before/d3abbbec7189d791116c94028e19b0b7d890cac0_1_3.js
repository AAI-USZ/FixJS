function() {
    attrs = {};
    a = new Backbone.Model(attrs);
    equals(a.has("name"), false);
    _([true, "Truth!", 1, false, '', 0]).each(function(value) {
      a.set({'name': value});
      equals(a.has("name"), true);
    });
    a.unset('name');
    equals(a.has('name'), false);
    _([null, undefined]).each(function(value) {
      a.set({'name': value});
      equals(a.has("name"), false);
    });
  }