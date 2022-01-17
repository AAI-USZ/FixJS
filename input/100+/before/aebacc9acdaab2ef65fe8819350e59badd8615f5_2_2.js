function unbindNode(binder, handles) {
        var retainBinder = false;

        if (Y.Lang.isFunction(binder.unbind)) {
            // let the binder decide whether it wants to stick around in case
            // its node is reattached at some point in the future
            retainBinder = binder.unbind.call(binder);
        }

        if (handles) {
            Y.Array.each(handles, function(handle) {
                Y.log('Detaching event handle from binder', 'debug', NAME);
                handle.detach();
            });
        }
        return retainBinder;
    }