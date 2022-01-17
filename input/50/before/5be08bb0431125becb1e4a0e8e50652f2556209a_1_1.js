function(name) {
			// create the steal, mark it as loading, then as loaded
			var stel = Resource.make( name );
			stel.loading = true;
			//convert(stel, "complete");

			steal.preexecuted(stel);
			stel.executed()
			return steal;
		}