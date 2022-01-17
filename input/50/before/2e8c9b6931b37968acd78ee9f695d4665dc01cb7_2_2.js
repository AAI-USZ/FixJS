function(page) {
		page.app = this;
		this.pages[page.name] = page;
		if(this.theme) {
			page.attributes['data-theme'] = this.theme;
		}
	}