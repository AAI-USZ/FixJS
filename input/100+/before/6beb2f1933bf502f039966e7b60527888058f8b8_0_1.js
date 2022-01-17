function() {

		if(this.get("can_two_up")) {
			var twoUp = this.get("two_up");
			var displayed = this.get("current_page");
			var newPages = [];

			// Two pages are currently displayed; find the single page number to display
			if(twoUp) {
				if (displayed[0] === 0) {
					newPages[0] = 1;
				} else {
					newPages[0] = displayed[0];
				}
			}
			// A single reflowable page is currently displayed; find two pages to display
			else if(!this.getCurrentSection().isFixedLayout()) {
				if(displayed[0] % 2 === 1) {
					newPages[0] = displayed[0];
					newPages[1] = displayed[0] + 1;
				}
				else {
					newPages[0] = displayed[0] - 1;
					newPages[1] = displayed[0];
				}
			}
			// A single fixed layout page is displayed
			else {

				// page progression is right-to-left
				if (this.get("page_prog_dir") === "rtl") {

					if (this.displayedPageIsLeft(displayed[0])) {
						newPages[0] = displayed[0] - 1;
						newPages[1] = displayed[0];
					}
					else if (this.displayedPageIsRight) {
						newPages[0] = displayed[0];
						newPages[1] = displayed[0] + 1;
					}

					// TODO: Handle center pages and all adjacent left-left, right-right pages
				}
				// page progression is left-to-right
				else {

					if (this.displayedPageIsLeft(displayed[0])) {
						newPages[0] = displayed[0];
						newPages[1] = displayed[0] + 1;
					}
					else if (this.displayedPageIsRight) {
						newPages[0] = displayed[0] - 1;
						newPages[1] = displayed[0];
					}

					// TODO: Handle center pages and all adjacent left-left, right-right pages
				}
			}

			this.set({two_up: !twoUp, current_page: newPages});
		}	
	}