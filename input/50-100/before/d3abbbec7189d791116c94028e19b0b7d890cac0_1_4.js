function() {
    var Model = Backbone.Model.extend({
      urlRoot: '/collection'
    });
    var model = new Model();
    equals(model.url(), '/collection');
    model.set({id: '+1+'});
    equals(model.url(), '/collection/%2B1%2B');
  }