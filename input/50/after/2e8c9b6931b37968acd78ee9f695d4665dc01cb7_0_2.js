function(page) {
		page.app = this;
		if(this.theme) {
			page.attributes['data-theme'] = this.theme;
		}
		this.pages[page.name] = page;
	}