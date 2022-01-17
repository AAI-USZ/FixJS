function(Backbone, _, undefined) {
    var defaultOptions = {
        forceUpdate: false,
        selector: 'name'
    };

    var getValidatedAttrs = function(model){
        return _.reduce(_.keys(model.validation), function(memo, key){
            memo[key] = undefined;
            return memo;
        }, {});
    };

    var getValidators = function(model, validation, attr) {
        var attrValidation = validation[attr] || {};

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
    };

    var hasChildValidaton = function(validation, attr) {
        return _.isObject(validation) && _.isObject(validation[attr]) && _.isObject(validation[attr].validation);
    };

    var validateAttr = function(model, validation, attr, value, computed) {
        var validators = getValidators(model, validation, attr);

        if (_.isFunction(validators)) {
            return validators.call(model, value, attr, computed);
        }

        return _.reduce(validators, function(memo, validator){
            var result = validator.fn.call(Backbone.Validation.validators, value, attr, validator.val, model, computed);
            if(result === false || memo === false) {
                return false;
            }
            if (result && !memo) {
                return validator.msg || result;
            }
            return memo;
        }, '');
    };

    var validateAll = function(model, validation, attrs, computed, view, options) {
        if (!attrs) {
          return false;
        }
        var isValid = true, error;
        for (var validatedAttr in validation) {
            error = validateAttr(model, validation, validatedAttr, model.get(validatedAttr), computed);
            if (_.isUndefined(attrs[validatedAttr]) && error) {
                isValid = false;
                break;
            } else if(!error && view) {
                options.valid(view, validatedAttr, options.selector);
            }
            if (error !== false && hasChildValidaton(validation, validatedAttr)) {
                isValid = validateAll(model, validation[validatedAttr].validation, attrs[validatedAttr], computed);
            }
        }
        return isValid;
    };

    var validateObject = function(view, model, validation, attrs, options, attrPath) {
        attrPath = attrPath || '';
        var result, error, changedAttr,
            errorMessages = [],
            invalidAttrs = [],
            isValid = true,
            computed = _.extend(model.toJSON(), attrs);

        for (changedAttr in attrs) {
            error = validateAttr(model, validation, changedAttr, attrs[changedAttr], computed);
            if (error) {
                errorMessages.push(error);
                invalidAttrs.push(attrPath + changedAttr);
                isValid = false;
                if(view) options.invalid(view, changedAttr, error, options.selector);
            } else {
                if(view) options.valid(view, changedAttr, options.selector);
            }

            if (error !== false && hasChildValidaton(validation, changedAttr)) {

                result = validateObject(view, model, validation[changedAttr].validation, attrs[changedAttr], options, attrPath + changedAttr + '.');

                Array.prototype.push.apply(errorMessages, result.errorMessages);
                Array.prototype.push.apply(invalidAttrs, result.invalidAttrs);
                isValid = isValid && result.isValid;
            }
        }

        if (isValid) {
            isValid = validateAll(model, validation, attrs, computed, view, options);
        }

        return {
            errorMessages: errorMessages,
            invalidAttrs: invalidAttrs,
            isValid: isValid
        };
    };

    var mixin = function(view, options) {
        return {
            isValid: function(option) {
                if(_.isString(option)){
                    return !validateAttr(this, this.validation, option, this.get(option), this.toJSON());
                }
                if(_.isArray(option)){
                    for (var i = 0; i < option.length; i++) {
                        if(validateAttr(this, this.validation, option[i], this.get(option[i]), this.toJSON())){
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
        };
    };

    var bindModel = function(view, model, options) {
        _.extend(model, mixin(view, options));
    };

    var unbindModel = function(model) {
        delete model.validate;
        delete model.isValid;
    };

    var collectonAdd = function(model) {
        bindModel(this.view, model, this.options);
    };

    var collectionRemove = function(model) {
        unbindModel(model);
    };

    return {
        version: '0.5.2',

        configure: function(options) {
            _.extend(defaultOptions, options);
        },

        bind: function(view, options) {
            var model = view.model,
                collection = view.collection,
                opt = _.extend({}, defaultOptions, Backbone.Validation.callbacks, options);

            if(model) {
                bindModel(view, model, opt);
            }
            if(collection) {
                collection.each(function(model){
                    bindModel(view, model, opt);
                });
                collection.bind('add', collectonAdd, {view: view, options: opt});
                collection.bind('remove', collectionRemove);
            }
        },

        unbind: function(view) {
            var model = view.model,
                collection = view.collection;
            if(model) {
                unbindModel(view.model);
            }
            if(collection) {
                collection.each(function(model){
                    unbindModel(model);
                });
                collection.unbind('add', collectonAdd);
                collection.unbind('remove', collectionRemove);
            }
        },

        mixin: mixin(null, defaultOptions)
    };
}