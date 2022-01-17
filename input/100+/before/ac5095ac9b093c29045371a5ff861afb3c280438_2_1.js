function(scope) {
        var fn = this, args = getArgs(arguments, 1), nop, bound;
        if(!isFunction(this)) {
          throw new TypeError('Function.prototype.bind called on a non-function');
        }
        bound = function() {
          return fn.apply(fn.prototype && this instanceof fn ? this : scope, args.concat(getArgs(arguments)));
        }
        nop = function() {};
        nop.prototype = this.prototype;
        bound.prototype = new nop();
        return bound;
      }