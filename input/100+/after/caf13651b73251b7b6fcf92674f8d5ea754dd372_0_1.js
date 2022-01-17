function defineSetterCallback(handlerName, callbackConstructor) {
        page.__defineSetter__(handlerName, function(f) {
            var callbackObj = page[callbackConstructor]();

            callbackObj.called.connect(function() {
                // Callback will receive a "deserialized", normal "arguments" array
                callbackObj.returnValue = f.apply(this, arguments[0]);
            });
        });
    }