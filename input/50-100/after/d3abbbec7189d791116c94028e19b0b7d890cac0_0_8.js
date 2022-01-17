function() {
    var ValidatingModel = Backbone.Model.extend({
      validate: function(attrs) {
        return "fail";
      }
    });
    var ValidatingCollection = Backbone.Collection.extend({
      model: ValidatingModel
    });
    var flag = false;
    var callback = function(model, error) { flag = true; };
    var col = new ValidatingCollection();
    col.create({"foo":"bar"}, { error: callback });
    equal(flag, true);
  }