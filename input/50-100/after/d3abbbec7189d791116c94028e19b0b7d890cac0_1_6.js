function() {
    var MongoModel = Backbone.Model.extend({idAttribute : '_id'});
    var model = new MongoModel({id: 'eye-dee', _id: 25, title: 'Model'});
    equal(model.get('id'), 'eye-dee');
    equal(model.id, 25);
    model.unset('_id');
    equal(model.id, undefined);
  }