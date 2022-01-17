function() {
		this._window = Services.wm.getMostRecentWindow("navigator:browser");
		if (!this._window)
			window.close();
		// init UI
		var toolbar = this._window.VerticalToolbar.toolbox.firstChild;
		document.getElementById("button_mode").value = toolbar.getAttribute("mode");
		document.getElementById("borders").checked = toolbar.getAttribute("flatbutton") != "true";
		this.updateAutoHideOptions();
		// always show accept button
		if (document.documentElement.instantApply) {
			var button = document.documentElement.getButton("accept");
			button.hidden = false;
			button.disabled = false;
		}
		// show toolbar temporarily even if autohide is enabled
		this._window.VerticalToolbar.handleEvent({ type: "dragenter" });
		// focus the window if it is in background
		window.focus();
	}