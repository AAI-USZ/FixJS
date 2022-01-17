function invokeAction(controllerName, action, _arguments) {
        var controller = new ControllersPool[controllerName];

        var hooksParameters = [action].concat(_arguments);
        var deferred = $.Deferred();
        //do beforeFilter
        var result = controller.beforeFilter.apply(controller, hooksParameters);
        if (isDeferred(result)) {
            deferred = result;
        } else {
            assertDeferredByResult(deferred, result);
        }

        //check if secure method
        if (typeof controller._secureActions[action] === 'function') {
            //do session checking
            deferred = deferred.pipe(function () {
                var result = controller['checkSession'].apply(controller, _arguments);

                if (isDeferred(result)) {
                    return result;
                } else {
                    return assertDeferredByResult(new $.Deferred(), result);
                }
            })
        }

        //invoke the action
        deferred = deferred.pipe(function () {
            var result = controller[action].apply(controller, _arguments);

            if (isDeferred(result)) {
                return result;
            } else {
                return assertDeferredByResult(new $.Deferred(), result);
            }
        });

        //do afterRender
        deferred = deferred.pipe(function () {
            var result = controller.afterRender.apply(controller, hooksParameters);
            if (isDeferred(result)) {
                return result;
            } else {
                return assertDeferredByResult(new $.Deferred(), result);
            }
        });

        return deferred;
    }