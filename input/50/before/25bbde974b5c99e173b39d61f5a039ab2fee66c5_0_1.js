function(id) {
			// return a model based upon an id search
			var last = null;

			this.some(function(el) {
				return el.get('id') == id && (last = el);
			});

			return last;
		}