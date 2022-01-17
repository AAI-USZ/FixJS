function(event) {
			// that.logr.removeFilters();
			
			that.filters = [];

			$(that.eloutput).empty();
			that.logr.resetFrom(that.from);
			that.from = null;

			that.listFilters();
		}