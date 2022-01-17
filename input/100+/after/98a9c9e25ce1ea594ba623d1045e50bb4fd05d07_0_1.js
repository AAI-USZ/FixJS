function(model, attr) {
        var attrValidation = model.validation[attr] || {};

        if (_.isFunction(attrValidation)) {
            return attrValidation;
        } else if(_.isString(attrValidation)) {
            return model[attrValidation];
        } else if(!_.isArray(attrValidation)) {
            attrValidation = [attrValidation];
        }

        return _.reduce(attrValidation, function(memo, attrValidation){
            _.each(_.without(_.keys(attrValidation), 'msg'), function(validator){
                memo.push({
                    fn: Backbone.Validation.validators[validator],
                    val: attrValidation[validator],
                    msg: attrValidation.msg
                });
            });
            return memo;
        }, []);
    }