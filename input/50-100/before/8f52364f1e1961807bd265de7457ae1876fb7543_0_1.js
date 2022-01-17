function() {
			var length = this.getLength();
			var has_pages = Math.floor(length/this.page_limit);
			var remainder = length % this.page_limit;
			var next_page = has_pages + 1;

			return {
				current_length: length,
				has_pages: has_pages,
				page_limit: this.page_limit,
				remainder: remainder,
				next_page: next_page
			};
		}