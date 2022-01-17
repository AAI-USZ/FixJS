function(Backbone, _, undefined) {
    var defaultOptions = {
        forceUpdate: false,
        selector: 'name',
        valid: Function.prototype,
        invalid: Function.prototype
    };

    var getValidatedAttrs = function(model){
        return _.reduce(_.keys(model.validation), function(memo, key){
            memo[key] = undefined;
            return memo;
        }, {});
    };

    var getValidators = function(model, attr) {
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
    };

    var validateAttr = function(model, attr, value, computed) {
        var validators = getValidators(model, attr);

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

    var validateModel = function(model, attrs) {
        var result, error, attr,
            invalidAttrs = [],
            errorMessages = [],
            isValid = true,
            computed = _.clone(attrs);

        for (attr in attrs) {
            error = validateAttr(model, attr, attrs[attr], computed);
            if (error) {
                invalidAttrs.push(attr);
                errorMessages.push(error);
                isValid = false;
            }
        }

        return {
            invalidAttrs: invalidAttrs,
            errorMessages: errorMessages,
            isValid: isValid
        };
    };

    var mixin = function(view, options) {
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