function (actionPath) {
                var components = actionPath.replace(/\/+$/g, '').split('/');
                var controllerName = undefined;

                //look for controllers
                if (ControllersPool[components[0]]) {
                    controllerName = components[0];
                } else if (typeof ControllersPool[camelCased(components[0])] !== 'undefined') {
                    controllerName = camelCased(components[0]);
                } else if (typeof ControllersPool[underscored(components[0])] !== 'undefined') {
                    controllerName = underscored(components[0]);
                }

                //test if the controller exists, if not, return a deferred object and reject it.
                if (typeof controllerName == 'undefined') {
                    return this['404'](); //no such controller, reject
                }

                var controller = new ControllersPool[controllerName];
                //if the action is omitted, it is 'default'.
                var action = components.length > 1 ? components[1] : 'default';

                if (typeof controller._actions[action] !== 'function') {
                    return this['404'](); //no such action, reject
                }

                //the URL components after the 2nd are passed to the action method
                var _arguments = components.length > 2 ? _.rest(components, 2) : [];

                addHistoryEntry(this, controllerName, action, _arguments);
                return invokeAction(controllerName, action, _arguments);
            }