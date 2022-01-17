function() {
		if (this.scriptName) {
			var $widget = $(this.content).dialog("widget");
			$widget.find(".morebits-dialog-scriptname").remove();
			var scriptnamespan = document.createElement("span");
			scriptnamespan.className = "morebits-dialog-scriptname";
			scriptnamespan.textContent = this.scriptName + " \u00B7 ";  // U+00B7 MIDDLE DOT = &middot;
			$widget.find(".ui-dialog-title").prepend(scriptnamespan);
		}

		var dialog = $(this.content).dialog("open");
		if (window.setupTooltips) { dialog.parent()[0].ranSetupTooltipsAlready = false; setupTooltips(dialog.parent()[0]); } //tie in with NAVPOP
		this.setHeight( this.height );  // init height algorithm
	}