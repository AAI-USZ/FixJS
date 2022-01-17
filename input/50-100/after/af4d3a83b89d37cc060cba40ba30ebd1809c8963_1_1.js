function(){
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
		}