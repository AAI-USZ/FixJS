function(pageNumber) {

		// in two up mode we need to keep track of what side
		// of the spine the odd pages go on
		if(this.get("two_up")) {
			
			// Fixed layout page
			if(this.getCurrentSection().isFixedLayout()) {

				if (this.get("page_prog_dir") === "rtl") {

					if (this.displayedPageIsLeft(pageNumber)) {

						this.set("current_page", [pageNumber - 1, pageNumber]);	
					}
					else if (this.displayedPageIsRight(pageNumber)) {

						this.set("current_page", [pageNumber, pageNumber + 1]);
					}

					// Handle center pages
				}
				// Left-to-right page progression
				else {

					if (this.displayedPageIsLeft(pageNumber)) {

						this.set("current_page", [pageNumber, pageNumber + 1]);	
					}
					else if (this.displayedPageIsRight(pageNumber)) {

						this.set("current_page", [pageNumber - 1, pageNumber]);
					}

					// TODO: Handle center pages
				}
			}
			// This is a reflowable page
			else {
				// in reflowable format, we want this config always:
				// ODD_PAGE |spine| EVEN_PAGE
				if(pageNumber % 2 === 1) {
					this.set("current_page", [pageNumber, pageNumber + 1]);	
				}
				else {
					this.set("current_page", [pageNumber - 1, pageNumber]);
				}	
			}
			
		}
		else {
			this.set("current_page", [pageNumber])
		}
	}