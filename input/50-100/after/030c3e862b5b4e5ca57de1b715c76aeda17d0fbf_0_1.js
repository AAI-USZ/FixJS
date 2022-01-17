function() {
		var theme = this.model.get("current_theme");
		if(theme === "default") theme = "default-theme";
		$(this.getBody()).css({
			"color": this.themes[theme]["color"],
			"background-color": this.themes[theme]["background-color"]
		});
		this.activateEPubStyle(this.getBody());
		this.renderMoPlaying();
	}