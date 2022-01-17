function() {
		sys.log("Centrum24: logging out");
		this.tab.document().findAllContaining("Logout")[0].click();
		this.tab.wait();
	}