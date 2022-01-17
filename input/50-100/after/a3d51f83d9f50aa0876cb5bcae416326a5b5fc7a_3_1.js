function() {
        modelClass = Ember.Object.extend(Ember.Validations);
        model = modelClass.create({
            validations: {
                name: {
                    customPresence: {
                        validator: function(obj, attr, val) {
                            if (!val) {
                                obj.get('errors').add(attr, "is empty");
                            }
                        }
                    }
                }
            }
        });
    }