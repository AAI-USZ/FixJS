function(pos) {
				var locs = locationList;
				var i;
				for(i = 0; i < pos; i++){
					locs = locs.rest();
				}
				return locs.first();
			}