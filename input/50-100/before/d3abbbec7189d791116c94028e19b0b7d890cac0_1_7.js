function() {
    var changed;
    var model = new Backbone.Model({name : "Model"});
    model.bind("change:name", function(){ changed = true; });
    model.clear();
    equals(changed, true);
    equals(model.get('name'), undefined);
  }