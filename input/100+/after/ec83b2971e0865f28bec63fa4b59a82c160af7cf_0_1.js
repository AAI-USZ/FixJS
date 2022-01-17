function (depth) { 

        if ( arguments.length > 1 ) {
             throw new Error('Takes a single argument, ' + arguments.length + ' provided.');
        }

        var arity = depth == null ?  this.length : depth,

            curry = function (arity) {

            var that = this,
                args = slice.call(arguments, 1);
            
            return function () {

                var allArgs = args.concat(slice.call(arguments));

                return allArgs.length >= arity ? 
                    that.apply(this, allArgs) :
                    curry.apply(that, [arity].concat(allArgs));

            };

        };

        return curry.call(this, arity);

    }