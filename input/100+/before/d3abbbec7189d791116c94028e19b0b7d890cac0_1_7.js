function() {
    var value;
    var model = new Backbone.Model({name: 'Rob'});
    model.bind('change', function(model, options) {
      value = options.prefix + model.get('name');
    });
    model.set({name: 'Bob'}, {silent: true});
    model.change({prefix: 'Mr. '});
    equals(value, 'Mr. Bob');
    model.set({name: 'Sue'}, {prefix: 'Ms. '});
    equals(value, 'Ms. Sue');
  }