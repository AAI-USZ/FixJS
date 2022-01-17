function() {
    var ValidatingModel = Backbone.Model.extend({
      validate: function(attrs) {
        return "fail";
      }
    });
    var ValidatingCollection = Backbone.Collection.extend({
      model: ValidatingModel
    });
    var col = new ValidatingCollection();
    equals(col.create({"foo":"bar"}),false);
  }