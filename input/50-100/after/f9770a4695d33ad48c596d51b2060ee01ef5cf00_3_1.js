function () {
		var search = this.grid.find('input.aloha-browser-search-field'), searchValue = search.val();

		if (jQuery(search).hasClass("aloha-browser-search-field-empty")) {
			searchValue = null;
		} else if (searchValue == "") {
			searchValue = null;
		}

		this._pagingOffset = 0;
		this._searchQuery  = searchValue;
		
		this.fetchItems(this._currentFolder, this.processItems);
	}