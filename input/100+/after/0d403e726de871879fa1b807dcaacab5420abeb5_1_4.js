function(name, initArgs) {
		// if there's no guard, construct a default one

		if (!guard) {
			guard = function(k) {
				if (arguments.length == 3) {
					k(arguments[1]);
				}
				else {
					var args = [];
					var i;
					for(i = 1; i < arguments.length-1; i++) {
						args.push(arguments[i]);
					}
					k(new ValuesWrapper(args));
				}
			}
		}

		var that = this;
		var cont = function(guardRes) {
			var guardedArgs;
			if ( guardRes instanceof ValuesWrapper ) {
				guardedArgs = guardRes.elts;
			} else {
				guardedArgs = [guardRes];
			}
			
			var parentArgs = guardedArgs.slice(0, numParentArgs);
			that._super(name, parentArgs);

			for (var i = 0; i < initFieldCnt; i++) {
				that._fields.push(guardedArgs[i+numParentArgs]);
			}
			for (var i = 0; i < autoFieldCnt; i++) {
				that._fields.push(autoV);
			}
		};
		initArgs.unshift(cont);
		initArgs.push(Symbol.makeInstance(name));
		guard.apply(null, initArgs);
	}