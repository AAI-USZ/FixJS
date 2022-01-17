function(event) {
			// that.logr.removeFilters();
			
			that.filters = [];
			that.logr.setFilter(that.filters);
			
			$(that.eloutput).empty();

			console.log("About to reset from ", that.from)
			that.logr.resetFrom(that.from);
			that.from = null;

			that.listFilters();
		}