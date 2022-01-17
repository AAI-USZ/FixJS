function() {
    var Model = Backbone.Model.extend({
      urlRoot: '/collection'
    });
    var model = new Model();
    equal(model.url(), '/collection');
    model.set({id: '+1+'});
    equal(model.url(), '/collection/%2B1%2B');
  }