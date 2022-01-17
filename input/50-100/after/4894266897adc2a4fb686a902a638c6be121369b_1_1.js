function(inSender, inEvent) {
		this.requestHideTooltip();
		if (inEvent.originator.active) {
			this.menuActive = true;
			this.activator = inEvent.originator;
			this.activator.addClass("active");
			this.requestShowMenu();
		}
	}