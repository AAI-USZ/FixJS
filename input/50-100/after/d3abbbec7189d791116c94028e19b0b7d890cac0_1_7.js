function() {
    var changed;
    var model = new Backbone.Model({name : "Model"});
    model.bind("change:name", function(){ changed = true; });
    model.clear();
    equal(changed, true);
    equal(model.get('name'), undefined);
  }