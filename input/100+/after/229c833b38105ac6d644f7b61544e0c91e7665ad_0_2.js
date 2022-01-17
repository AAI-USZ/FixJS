function() {

  /**

   * A utility to make it easy to perform an action conditioning

   * on all async calls' results ready

   *

   * Usage:

   * var river = Threads.river();

   * river.join(

   *   async1(param1, river.branch("entry")),

   *   async1(param2, river.branch("group")),

   *   function(joined) {

   *     var entry = joined.entry[0];

   *     var group = joined.group[1];

   *   }

   * );

   */

  this.river = function() {

    var result = new function() {

      var instance = this;

      var names = {};

      var args = {};

      var size = 0;

      var count = 0;

      var fun;



      instance.branch = function(name) {

        if (names[name] !== undefined) {

          throw "Duplicated name";

        } else {

          names[name] = name;

        }



        var pos = size++;

        var method = function(list) {

          if (args[name] === undefined) {

            count++;

            args[name] = Array.prototype.slice.call(arguments);

            if (count === size) {

              if (!!fun) {

                fun.apply(this, [args]);

              }

            }

          } else {

            console.error("Duplicated call.");

          }

        };

        return method;

      };

      instance.join = function(oneormorebranches, fn) {

        fun = arguments[arguments.length - 1];

        Arguments.assertNonNullFn(fun);



        // join might be called at last, if calls to branches are synchronous

        if (count === size) {

          fun.apply(this, [args]);

        }

      };

    };

    return result;

  };



  this.latchbinder = function() {

    var result = new function() {

      var instance = this;

      var caller, args;

      var queue = [];

      this.latch = function() {

        if (!caller) {

          caller = this;

          args = Array.prototype.slice.call(arguments);

          for (var i=0,len=queue.length; i<len; i++) {

            queue[i].apply(caller, args);

          }

          queue = null;

        }

      };

      this.bind = function(fn) {

        if (caller) {

          fn.apply(caller, args);

        } else {

          queue.push(fn);

        }

      };

    };

    return result;

  };

}