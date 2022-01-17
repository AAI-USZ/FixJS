function(part, filter){
			filter = filter || function(p){ return p.name() == part.name(); };
			if(parts > 1) {
				var elems = self.find(filter);

				if(elems){
					delete elems[0];
				}
			}
		}