function(widget, srcElement) {
		this.inherited(arguments);
		if (widget.dijitWidget){
			widget.dijitWidget.disableTouchScroll = true;
		}

	}