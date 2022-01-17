function () {
		var search = this.grid.find('input.aloha-browser-search-field'), searchValue = search.val();

		if (jQuery(search).css("font-style") == "italic") {
			searchValue = "";
		}

		this._pagingOffset = 0;
		this._searchQuery  = search.val();
		
		this.fetchItems(this._currentFolder, this.processItems);
	}