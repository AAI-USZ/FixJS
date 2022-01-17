function(locations) {
				var coloredParts = [];
				var locs = locations;
				var i;

				//ARGS IS INCONSISTENT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				//and when there's a state, it's apparently not an array, so .slice(1) doesn't work
				if(state.isState(args[0])){
					for(i = 1; i < args.length; i++){
						if(i != pos) {
							coloredParts.push(new types.ColoredPart(args[i]+" ", locs.first()));
						}
						locs = locs.rest();
					}
				}
				else {
					for(i = 0; i < args.length; i++){
						if(i != (pos -1)) {
							coloredParts.push(new types.ColoredPart(args[i]+" ", locs.first()));
						}
						locs = locs.rest();
					}
				}
				return coloredParts;
			}