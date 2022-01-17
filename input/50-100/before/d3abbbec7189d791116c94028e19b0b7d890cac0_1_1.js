function() {
    var Model = Backbone.Model.extend({
      initialize: function() {
        this.one = 1;
        equals(this.collection, collection);
      }
    });
    var model = new Model({}, {collection: collection});
    equals(model.one, 1);
    equals(model.collection, collection);
  }