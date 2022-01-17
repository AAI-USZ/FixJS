function() {
		log.debug('Clicked on searchButton', this.logAuthor);

		var grid = this.grid;
		var store = grid.getStore();
		var search = grid.down('textfield[name=searchField]').getValue();

		if (search == '') {
			store.clearFilter();
			//store.load()
		}else {
			//create an array and give it to store.search
			var search_filters = [];
			
			// Split search string by space
			var search_value_array = search.split(' ')
			
			log.debug(' + Search:', this.logAuthor);
			log.dump(search_value_array);
			
			for (var i in grid.opt_bar_search_field) {
				var field = grid.opt_bar_search_field[i]
				
				if (search_value_array.length == 1){
					var filter = {};
					filter[field] = { '$regex' : search, "$options": 'i'};
				
					search_filters.push(filter);
				
				} else {
					var filter = []
					for (var j in search_value_array){
						var sub_filter = {}
						sub_filter[field] = { '$regex' : search_value_array[j], "$options": 'i'}
						filter.push(sub_filter)
					}
					search_filters.push({ "$and": filter})
				}		
			}
			
			if (search_filters.length == 1)
				store.search(search_filters[0], false);
			else
				store.search(store.getOrFilter(search_filters), false);
		}

		if (grid.pagingbar) {
			grid.pagingbar.moveFirst();
		}else {
			store.load();
		}
	}