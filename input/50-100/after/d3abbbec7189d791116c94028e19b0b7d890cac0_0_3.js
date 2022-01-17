function() {
    var col = new Backbone.Collection();
    var MongoModel = Backbone.Model.extend({
      idAttribute: '_id'
    });
    var model = new MongoModel({_id: 100});
    col.add(model);
    equal(col.get(100), model);
    model.set({_id: 101});
    equal(col.get(101), model);
  }