function Robot (opts/*e.g., {name: "RobotA", bus: EventBus(), algs: {wheel:W, chassis: C}}*/){
	var parts 		= [];

	var self 	= {
		/**
		 * assembles a Robot given a set of parts and a set of PCG
		 * algorithms that put these parts together.
		 */
		assemble: function(){
		  	// iterate over all algorithms in the right order
	      	// get the necessary data or resources for the algo to function
		  	// return a result
			var algs = self.options().algs;
			if (algs && algs.length) {
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
				algs.forEach(function (elem) {
					// e.g., function(data){ AlgorithmX(data).perform(); }
					data = elem.callback.call(data);
				});

				// persist the assembled robot in a format understood by
				// a 3D printing system. e.g., JSON.
				self.persist(data);
			}
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
			console.log(data);
			// todo(anyone) to persist the assembled Robot.
		},

		/**
		 * uninstalls the parts matching a condition.
		 * @param part part to be uninstalled.
		 * @param filter filter condition that will help us find the elements of interest.
		 */
		uninstall: function(part, filter){
			filter = filter || function(p){ return p.name() == part.name(); };
			if(parts > 1) {
				var elems = self.find(filter);

				if(elems){
					delete elems[0];
				}
			}
		}
	};

	// Mixing it in, just smash the methods of the newly created
	// View onto this object
	opts = opts || {};
	$.extend (self, Model (opts));
	return self;
}