function() {
    var model = new Backbone.Model({name : "Model"});
    model.set({name : ''});
    equals(model.get('name'), '');
  }