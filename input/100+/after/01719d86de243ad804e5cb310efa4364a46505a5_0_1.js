function(){
		log.debug('select', this.logAuthor);
		
		// Filter on tags
		var selected_tags = []
		try {
			selected_tags = Ext.query('#'+this.grid.id+" ul[class=tags] > li:hover > a")
		} catch(err) {
			log.debug('No tags in grid', this.logAuthor);
		}
		
		if (selected_tags.length > 0){
			var tag = Ext.get(selected_tags[0]).getHTML()
			var search = this.grid.down('textfield[name=searchField]');
			if (search && tag){
				search.setValue('#'+tag)
				this._searchRecord()
			}
		}
	}