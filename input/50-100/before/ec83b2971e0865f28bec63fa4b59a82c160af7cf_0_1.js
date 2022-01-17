function () {

            var allArgs = args.concat(slice.call(arguments));

            return allArgs.length >= arity ? 
                that.apply(this, allArgs) :
                that.curry.apply(that, [arity].concat(allArgs));

        }