function(pos) {
				var locs = locationList;
				var toReturn;
				for(var i = 0; i < args.length; i++) {
					if(i === pos){
						toReturn = locs.first();
					} 
					locs = locs.rest();
				}
				return toReturn;
			}