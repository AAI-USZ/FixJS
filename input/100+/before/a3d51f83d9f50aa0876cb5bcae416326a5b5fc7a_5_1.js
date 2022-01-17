function(val, index) {
        model.set('errors', Ember.ValidationErrors.create());
        validator.validate(model, 'name', val);

        var errorMessage = model.getPath('errors.messages.name');
        ok(errorMessage, "should set 'name' message for value: '" + val + "' (" + index + ")");
        equal(errorMessage.length, 1, "should set one 'name' error message for value: '" + val + "' (" + index + ")");
        equal(errorMessage[0], "can't be blank");
    }