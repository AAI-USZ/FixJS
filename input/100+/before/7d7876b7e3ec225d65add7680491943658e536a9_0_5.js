function (properties) {
            var name = properties['name'];
            if (typeof name === 'undefined') {
                throw '\'name\' property is mandatory ';
            }

            // also inherits the methods from ancestry
            properties = _.extend({}, _inheritedMethodsDefinition, properties);

            //special handling of method override in inheritance
            var tmpControllerProperties = _.extend({}, BackboneMVC.Controller);

            var actionMethods = {}, secureActions = {};
            //try to pick out action methods
            _.each(properties, function (value, propertyName) {
                tmpControllerProperties[propertyName] = value; // transfer the property, which will be later
                //filter the non-action methods
                if (typeof value !== 'function' || propertyName[0] === '_'
                    || _.indexOf(systemActions, propertyName) >= 0) {
                    return false;
                }

                actionMethods[propertyName] = value;
                if (propertyName.match(/^user_/i)) { //special handling to secure methods
                    secureActions[propertyName] = value;
                    // even though secure methods start with 'user_', it's useful if they can be invoked without
                    // that prefix
                    var shortName = propertyName.replace(/^user_/i, '');
                    if (typeof properties[shortName] !== 'function') {
                        // if the shortname function is not defined separately, also account it for a secure method
                        secureActions[shortName] = value;
                        actionMethods[shortName] = value;
                    }
                }
            });

            //_actions and _secureActions are only used to tag those two types of methods, the action methods
            //are still with the controller
            _.extend(tmpControllerProperties, actionMethods, {
                _actions:actionMethods,
                _secureActions:secureActions
            });
            //remove the extend method if there is one, so it doesn't stay in the property history
            if ('extend' in tmpControllerProperties) {
                delete tmpControllerProperties['extend'];
            }
            //get around of singleton inheritance issue by using mixin
            var _controllerClass = ControllerSingleton.extend(tmpControllerProperties);
            //special handling for utility method of inheritance
            _.extend(_controllerClass, {
                extend:_extendMethodGenerator(_controllerClass, _.extend({}, _inheritedMethodsDefinition, properties))
            });

            //Register Controller
            ControllersPool[name] = _controllerClass;

            return _controllerClass;
        }