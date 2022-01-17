function(e){
		
		var model = new VS.model.SearchFacet({
	      category : 'filter',
	      value    : $(this).data('searchFilter'),
	      app      : visualSearch.searchBox.app
		});
		visualSearch.searchQuery.add(model, {at:0});
		visualSearch.options.callbacks.search( null, visualSearch.searchQuery);
		
		$('.filter-list').hide();
		console.log('search filter', visualSearch, model)
		e.stopPropagation();
		return false;
	}