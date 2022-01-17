function() {
    var i = 0;
    var counter = function(){ i++; };
    var model = new Backbone.Model({a: 1});
    model.bind("change:a", counter);
    model.set({a: 2});
    model.unset('a');
    model.unset('a');
    equals(i, 2, 'Unset does not fire an event for missing attributes.');
  }