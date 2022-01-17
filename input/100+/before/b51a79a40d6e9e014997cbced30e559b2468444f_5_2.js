function (event) {
		
		// Stop propagation
		that.prevent(event);
		
		// Z-index of content
		that.$content.css("z-index", ch.utils.zIndex += 1).attr("aria-hidden", "false");
		
		// Z-index of trigger over content (secondary / skin dropdown)
		if (that.$element.hasClass("secondary") || that.$element.hasClass("ch-dropdown-skin")) { that.$trigger.css("z-index", ch.utils.zIndex += 1); }
		
		// Inheritance innerShow
		that.parent.innerShow(event);
		
		// Refresh position
		that.position("refresh");

		// Reset all dropdowns except itself
		$.each(ch.instances.dropdown, function (i, e) { 
			if (e.uid !== that.uid) { e.hide(); }
		});

		// Close events
		ch.utils.document.one("click " + ch.events.KEY.ESC, function () { that.innerHide(); });

		// Keyboard support
		var items = that.$content.find("a");
		// Select first anchor child by default
			items.eq(0).focus();

		if (items.length > 1) { shortcuts(items); };

		return that;
	}