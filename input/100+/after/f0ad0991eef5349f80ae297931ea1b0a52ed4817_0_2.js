function() {
		var curr_pg = this.get("current_page");
		var firstPage = curr_pg[curr_pg.length - 1] + 1;

		// For fixed layout pubs, check if the last page is displayed; if so, end navigation
		if (this.getCurrentSection().isFixedLayout()) {

			if (this.get("two_up") && 
				(curr_pg[0] === this.get("rendered_spine_items").length || 
				 curr_pg[1] === this.get("rendered_spine_items").length)
				) {

				return;
			}
		}

		if (curr_pg[curr_pg.length - 1] >= this.get("num_pages")) {

			this.goToNextSection();
		}
		else if (!this.get("two_up")) {

			this.set("current_page", [firstPage]);

			// Reset the spine position
			if (this.get("rendered_spine_items").length > 1) {

				var pos = this.get("rendered_spine_items")[firstPage - 1];
				this.set("spine_position", pos);
			}
		}
		// Two pages are being displayed
		else {

			this.setCurrentPagesForNextPage(firstPage);

			// Reset the spine position
			if (this.get("rendered_spine_items").length > 1) {

				var pos = this.get("rendered_spine_items")[firstPage - 1];
				this.set("spine_position", pos);
			}
		}
	}