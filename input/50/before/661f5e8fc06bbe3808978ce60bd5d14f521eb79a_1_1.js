function (el) {
			
				el = $(el);
				if(el.retrieve(store)) $(el).removeEvents(dragdrop).eliminate(store)[getFirst]().destroy();
				return this			
			}