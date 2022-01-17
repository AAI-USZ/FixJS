function() {
    var validate = function() {};
    var validator = Ember.Validators.getValidator('foo', {validator: validate, options: {opt: 'yes'}})

    ok(Ember.Validator.detectInstance(validator), "should be an instance of Validator");
    equal(validator.get('validate'), validate, "should set validate method from options");
    equal(validator.getPath('options.opt'), 'yes', "should set validator options");
}