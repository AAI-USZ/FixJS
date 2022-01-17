function (arity) {

            var that = this,
                args = slice.call(arguments, 1);
            
            return function () {

                var allArgs = args.concat(slice.call(arguments));

                return allArgs.length >= arity ? 
                    that.apply(this, allArgs) :
                    curry.apply(that, [arity].concat(allArgs));

            };

        }