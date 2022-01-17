function (event) {
		
		// Stop propagation
		that.prevent(event);
		
		// Z-index of content and updates aria values
		that.$content.css("z-index", ch.utils.zIndex += 1).attr("aria-hidden", "false");
		
		// Z-index of trigger over content (secondary / skin dropdown)
		if (that.$element.hasClass("ch-dropdown-skin")) { that.$trigger.css("z-index", ch.utils.zIndex += 1); }
		
		// Inheritance innerShow
		that.parent.innerShow(event);
		
		// Refresh position
		that.position("refresh");

		// Reset all dropdowns except itself
		$.each(ch.instances.dropdown, function (i, e) { 
			if (e.uid !== that.uid) { e.hide(); }
		});

		that.$options[0].focus();

		return that;
	}