function() {
		mode = (mode === "default" ? "metadata" : "default");
		setTitle();
		self.dom.get("data").toggle();
		self.dom.get("metadata").toggle();
	}