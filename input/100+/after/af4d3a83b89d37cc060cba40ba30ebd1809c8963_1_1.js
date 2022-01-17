function Robot (opts/*e.g., {name: "RobotA", bus: EventBus(), algs: {wheel:W, chassis: C}}*/){
	var parts 		= [];

    var toArray = function(algs){
        var algorithms = [];
        for(var each in algs){
            algorithms.push(algs[each]);
        }
        return algorithms;
    };

	var self 	= {
		/**
		 * assembles a Robot given a set of parts and a set of PCG
		 * algorithms that put these parts together.
		 */
		assemble: function(){
		  	// iterate over all algorithms in the right order
	      	// get the necessary data or resources for the algo to function
		  	// return a result
			var algs = this.options().algs;
			if (algs) {
				/**
				 * The idea is to call the algorithms in a specific order,
				 * each of which feeds the next algorithm in turn.
				 *
				 * For example, let's assume we have three algorithms:
				 * 1. chassis layout,
				 * 2. wheels' snapping,
				 * 3. and wires' routing
				 *
				 * We execute the chassis' layout first given the available
				 * Robot parts. The output of this algorithm consists now
				 * of the Robot parts, and a given layout.
				 *
				 * Then, we execute the wheels' snapping algorithm given the
				 * the Robot parts, and a given layout. The output will be
				 * the Robot parts, a layout, and the wheels mounted on a set
				 * of coordinates along the available layout.
				 *
				 * Lastly, we execute the wires' routing algorithm given the
				 * output of the previous algorithm. The output of this algorithm
				 * is a complete robot with all its parts properly placed,
				 * snapped wheels, and the proper wiring.
				 *
				 **/
				var data = parts;
				toArray(algs).forEach(function (elem) {
					// e.g., function(data){ AlgorithmX(data).perform(); }
					data = elem.call(data);
				});

				// persist the assembled robot in a format understood by
				// a 3D printing system. e.g., JSON.
				self.persist(data);
			}
		},

        contains: function(part, filter) {
            filter = filter || function(element){ return element.name() == part.name(); };
            var elems = self.find(filter);
            return elems[0] != null;
        },

        count: function(){
            return parts.length;
        },

		/**
		 * finds the parts of interest matching a condition.
		 * @param filter filter condition.
		 * @return {*} matched elements.
		 */
		find: function(filter){
			return parts.select(filter);
		},

		/**
		 * installs a part on the Robot.
		 * @param part robot part to be installed.
		 */
		install: function(part) {
			parts.push(part);
		},

		/**
		 * persists the assambled robot.
		 * @param data assambled robot.
		 */
		persist: function(data) {
            data = data || {};
			console.log(data);
			// todo(anyone) to persist the assembled Robot.
		},

        _getPart: function(idx) {
          return parts[idx];
        },

		/**
		 * uninstalls the parts matching a condition.
		 * @param part part to be uninstalled.
		 */
		uninstall: function(part){
            for (var node, i = 0; node = self._getPart(i); i++) {
                if(node == part){
                    parts.splice(i, 1);
                }
            }
		}
	};

	// Mixing it in, just smash the methods of the newly created
	// View onto this object
	opts = opts || {};
    Mixable(self).mix( Model (opts));
	return self;
}