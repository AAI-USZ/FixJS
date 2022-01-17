function(event) {
			var filter = $(event.currentTarget).data('filter');
			console.log("clicked fliter button ", event.currentTarget);
			console.log("Filter: ", filter);

			that.filters.push(filter);
			that.logr.setFilter(that.filters);
			that.listFilters();

			$(that.eloutput).empty();

			that.logr.resetFrom(that.from);
			that.from = null;
		}