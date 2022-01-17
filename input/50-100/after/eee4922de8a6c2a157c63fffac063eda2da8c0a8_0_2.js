function (method) {
        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        // Don't need this part (yet)
        /*
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        */
        else {
            $.error('Method ' + method + ' does not exist on jQuery.Pods');
        }
    }