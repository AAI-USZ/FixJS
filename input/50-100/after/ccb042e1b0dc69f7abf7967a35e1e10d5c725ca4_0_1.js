function() {
		if (this.options.allow_single_deselect && dojo.query('abbr', this.selected_item).length < 1) {
			dojo.create('abbr', {className: 'search-choice-close'}, dojo.query('span', this.selected_item).shift()); 
		
		}
	}