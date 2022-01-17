function() {
    var error;
    var model = new Backbone.Model({name: "One"});
    model.validate = function(attrs) {
      if ("name" in attrs) {
        if (!attrs.name) {
          error = true;
          return "No thanks.";
        }
      }
    };
    model.set({name: "Two"});
    equals(model.get('name'), 'Two');
    equals(error, undefined);
    model.unset('name');
    equals(error, true);
    equals(model.get('name'), 'Two');
    model.clear();
    equals(model.get('name'), 'Two');
    delete model.validate;
    model.clear();
    equals(model.get('name'), undefined);
  }