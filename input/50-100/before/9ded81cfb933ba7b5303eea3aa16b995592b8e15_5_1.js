function destroyObject(object, message) {
        message = defaultValue(message, 'This object was destroyed, i.e., destroy() was called.');

        function throwOnDestroyed() {
            throw new DeveloperError(message);
        }

        for ( var key in object) {
            if (typeof object[key] === 'function') {
                object[key] = throwOnDestroyed;
            } else {
                delete object[key];
            }
        }

        object.isDestroyed = returnTrue;

        return undefined;
    }