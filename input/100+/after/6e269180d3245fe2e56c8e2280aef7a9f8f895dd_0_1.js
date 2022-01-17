function bind(that) {

        var target = this;
        if (typeof target != "function") throw new TypeError();

        var
        args = slice.call(arguments, 1),
        bound = function () {

          if (this instanceof bound) {

            var F = function(){};
            F.prototype = target.prototype;
            var self = new F();
            var result = target.apply(self, args.concat(slice.call(arguments)));

            if (Object(result) === result) return result;
            return self;

          } else {
            return target.apply( that, args.concat(slice.call(arguments)));
          }
        };
        return bound;
      }