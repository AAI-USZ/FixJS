function(searchResult) {
			$('#searchResultsModal').modal();
			var searchView = new UserSearchResultView({model: searchResult});
			$('#userSearchResult').append(searchView.render().el);
			userResultViews.push(searchView);
		}