function(view, options) {
        return {
            isValid: function(option) {
                if(_.isString(option)){
                    return !validateAttr(this, option, this.get(option), this.toJSON());
                }
                if(_.isArray(option)){
                    for (var i = 0; i < option.length; i++) {
                        if(validateAttr(this, option[i], this.get(option[i]), this.toJSON())){
                            return false;
                        }
                    }
                    return true;
                }
                if(option === true) {
                    this.validate();
                }
                return this.validation ? this._isValid : true;
            },

            validate: function(attrs, setOptions){
                var model = this,
                    validateAll = !attrs,
                    opt = _.extend({}, options, setOptions),
                    allAttrs = _.extend(getValidatedAttrs(model), model.toJSON(), attrs),
                    changedAttrs = attrs || allAttrs,
                    result = validateModel(model, allAttrs);

                model._isValid = result.isValid;

                for(var attr in allAttrs) {
                    var index = _.indexOf(result.invalidAttrs, attr);
                    if(index !== -1 && (changedAttrs.hasOwnProperty(attr) || validateAll)){
                        opt.invalid(view, attr, result.errorMessages[index], opt.selector);
                    }
                    if(!_.include(result.invalidAttrs, attr)){
                        opt.valid(view, attr, opt.selector);
                    }
                }
                _.defer(function() {
                    model.trigger('validated', model._isValid, model, result.invalidAttrs);
                    model.trigger('validated:' + (model._isValid ? 'valid' : 'invalid'), model, result.invalidAttrs);
                });

                if (!opt.forceUpdate && _.intersection(result.invalidAttrs, _.keys(changedAttrs)).length > 0) {
                    return result.errorMessages;
                }
            }
        };
    }