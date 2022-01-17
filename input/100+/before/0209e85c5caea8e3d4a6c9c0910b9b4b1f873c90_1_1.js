function () {
        var slice = Array.prototype.slice;

        function update(array, args) {
            var arrayLength = array.length, length = args.length;
            while (length--) array[arrayLength + length] = args[length];
            return array;
        }

        function merge(array, args) {
            array = slice.call(array, 0);
            return update(array, args);
        }

        function argumentNames() {
            var names = this.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1]
                .replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '')
                .replace(/\s+/g, '').split(',');
            return names.length == 1 && !names[0] ? [] : names;
        }

        function bind(context) {
            if (arguments.length < 2 && Object.isUndefined(arguments[0])) return this;
            var __method = this, args = slice.call(arguments, 1);
            return function () {
                var a = merge(args, arguments);
                return __method.apply(context, a);
            };
        }

        function bindAsEventListener(context) {
            var __method = this, args = slice.call(arguments, 1);
            return function (event) {
                var a = update([event || window.event], args);
                return __method.apply(context, a);
            };
        }

        function wrap(wrapper) {
            var __method = this;
            return function () {
                var a = update([__method.bind(this)], arguments);
                return wrapper.apply(this, a);
            };
        }

        return {
            argumentNames: argumentNames,
            bind: bind,
            bindAsEventListener: bindAsEventListener,
            wrap: wrap
        };
    }