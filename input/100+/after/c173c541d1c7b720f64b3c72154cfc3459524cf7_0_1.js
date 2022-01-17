function(locations) {
				var argColoredParts = [];
				var locs = locations;
				if (args.length > 0) {
					for (var i = 0; i < args.length; i++) {
						if(i != pos -1) { 
							argColoredParts.push(new types.ColoredPart(args[i]+" ", locs.first()));  //LOCATIONS OFF!!!
							//locs = locs.rest();
						}
						locs = locs.rest();
					}
				}
				return argColoredParts;
			}