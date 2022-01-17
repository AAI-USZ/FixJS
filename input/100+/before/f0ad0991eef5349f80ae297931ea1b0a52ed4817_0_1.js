function() {
		var curr_pg = this.get("current_page");
		var lastPage = curr_pg[0] - 1;

		// For fixed layout pubs, check if the last page is displayed; if so, end navigation.
		// TODO: This is a bit of a hack, but the this entire model underlying the part of the pub that 
		// is displayed on the screen probably needs to change. 
		if (this.getCurrentSection().isFixedLayout()) {

			if (this.get("two_up") && curr_pg[0] === 1) {

				return;
			}
		}

		if(curr_pg[0] <= 1) {
			this.goToPrevSection();
		}
		// Single page navigation
		else if(!this.get("two_up")){
			this.set("current_page", [lastPage]);
			if(this.get("rendered_spine_items").length > 1) {
				var pos = this.get("rendered_spine_items")[lastPage - 1];
				this.set("spine_position", pos);
			}
		}
		// Move to previous page with two side-by-side pages
		else {
			this.set("current_page", [lastPage - 1, lastPage]);

			if(this.get("rendered_spine_items").length > 1) {

				var ind = (lastPage > 1 ? lastPage - 2 : 0);
				var pos = this.get("rendered_spine_items")[ind];
				this.set("spine_position", pos);
			}
		}
	}