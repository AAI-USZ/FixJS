function() {
    var model = new Backbone.Model({name : "Model"});
    model.set({name : ''});
    equal(model.get('name'), '');
  }