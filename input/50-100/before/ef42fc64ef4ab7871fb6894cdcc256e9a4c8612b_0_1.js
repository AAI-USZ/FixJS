function() {
		// reset the AJAX queue
		$.ajaxQueue.stop(true);

		// empty the collection
		app.collections.articles.reset();
		app.collections.links.reset();

		var term = $("input[name=term]").val();
		if(term) {
			app.collections.articles.fetch({ data: { term: term, n: 10 } });
		}
	}