function(eloutput, elfilters) {
		var that = this;
		this.eloutput = eloutput;
		this.elfilters = elfilters;

		this.filters = [];

		this.from = null;
		this.to = null;


		this.eloutput.on("click", "div.logMain", function(event) {
			$(event.currentTarget).closest(".logentry").toggleClass("active");
			return false;
		});

		this.eloutput.on("click", "div.filterbtn ul.filterdropdown li", $.proxy(function(event) {
			var filter = $(event.currentTarget).data('filter');
			console.log("clicked fliter button ", event.currentTarget);
			console.log("Filter: ", filter);

			that.filters.push(filter);
			that.logr.setFilter(that.filters);
			that.listFilters();

			$(that.eloutput).empty();

			console.log("About to reset from ", that.from)
			that.logr.resetFrom(that.from);
			that.from = null;
		}, that));

		this.elfilters.on("click", "#resetfilters", function(event) {
			// that.logr.removeFilters();
			
			that.filters = [];
			that.logr.setFilter(that.filters);
			
			$(that.eloutput).empty();

			console.log("About to reset from ", that.from)
			that.logr.resetFrom(that.from);
			that.from = null;

			that.listFilters();
		});


		this.logr = new LogRetriever($.proxy(this.logresult, this));


		$(".tailcontrol").button()
			.on("click", "button.play", function() {

				console.log("Play");
				that.logr.play();
			})
			.on("click", "button.pause", function() {

				console.log("Pause");
				that.logr.pause();
			});

		// this.logr = new LogRetriever(this.logresult);
	}