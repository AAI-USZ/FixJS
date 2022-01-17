function() {
			// we don't use IE's interactive script functionality while
			// production scripts are loading
			support.interactive = false;
			each(arguments, function(i, arg) {
				var stel = Resource.make( arg );
				stel.loading = stel.executing = true;
			});
		}