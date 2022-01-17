function() {
    var MongoModel = Backbone.Model.extend({idAttribute : '_id'});
    var model = new MongoModel({id: 'eye-dee', _id: 25, title: 'Model'});
    equals(model.get('id'), 'eye-dee');
    equals(model.id, 25);
    model.unset('_id');
    equals(model.id, undefined);
  }