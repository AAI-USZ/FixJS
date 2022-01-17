function(terms) {
		var no_results_html = dojo.create('li', {class: 'no-results', innerHTML: this.results_none_found + ' "<span></span>" '}, this.search_results);			
		dojo.query('span', no_results_html).shift().innerHTML = terms;
	}