function() {
		mode = (mode == "default" ? "metadata" : "default");
		setTitle(element);
		self.dom.get("data").toggle();
		self.dom.get("metadata").toggle();
	}