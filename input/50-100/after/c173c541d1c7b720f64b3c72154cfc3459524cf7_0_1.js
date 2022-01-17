function(pos) {
				var locs = locationList;

				for(var i = 0; i < pos; i++){
					locs = locs.rest();
				}
				return locs.first();
			}