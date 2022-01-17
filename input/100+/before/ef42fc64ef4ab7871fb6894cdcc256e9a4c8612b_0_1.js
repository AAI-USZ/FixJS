function() {
	/** Fetch the list of articles and update the collection **/
	var refresh = function() {
		// reset the AJAX queue
		$.ajaxQueue.stop(true);

		// empty the collection
		app.collections.articles.reset();
		app.collections.links.reset();

		var term = $("input[name=term]").val();
		if(term) {
			app.collections.articles.fetch({ data: { term: term, n: 10 } });
		}
	};

	app.services = {
		pubmed: new PubMed(),
		altmetric: new Altmetric()
	};

	app.collections = {
		articles: new Collections.Articles(),
		links: new Collections.Links()
	};

	app.views = {
		input: new Views.Input({
			id: "input",
			className: "wrapper",
		}),

		articles: new Views.Articles({
			id: "articles",
			className: "wrapper",
			collection: app.collections.articles
		}),

		pagination: new Views.Pagination({
			id: "pagination",
			className: "wrapper pagination",
			collection: app.collections.links
		})
	};

	refresh();
}