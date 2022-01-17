function(attrs, setOptions){
                var model = this,
                    opt = _.extend({}, options, setOptions);
                if(!attrs){
                    return model.validate.call(model, _.extend(getValidatedAttrs(model), model.toJSON()));
                }

                var result = validateObject(view, model, model.validation, attrs, opt);
                model._isValid = result.isValid;

                _.defer(function() {
                    model.trigger('validated', model._isValid, model, result.invalidAttrs);
                    model.trigger('validated:' + (model._isValid ? 'valid' : 'invalid'), model, result.invalidAttrs);
                });

                if (!opt.forceUpdate && result.errorMessages.length > 0) {
                    return result.errorMessages;
                }
            }