function () {
    var changed = 0;
    var attrs = {id: 1, label: 'c'};
    var obj = new Backbone.Model(attrs);
    obj.bind('change', function() { changed += 1; });
    obj.set(attrs);
    equals(changed, 0);
  }