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
    equal(model.get('name'), 'Two');
    equal(error, undefined);
    model.unset('name');
    equal(error, true);
    equal(model.get('name'), 'Two');
    model.clear();
    equal(model.get('name'), 'Two');
    delete model.validate;
    model.clear();
    equal(model.get('name'), undefined);
  }