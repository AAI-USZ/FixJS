function bindAsEventListener(context) {
            var __method = this, args = slice.call(arguments, 1);
            return function (event) {
                var a = update([event || window.event], args);
                return __method.apply(context, a);
            };
        }