function() {
		$("select").blur();
		this.Element.focus();
		
		// Check if we're in a sortable row and disable it's relative position if so.
		li = this.Element.parent("li");
		if (li.length) {
			if (li.css("position") == "relative") {
				li.css("position","");
				this.WasRelative = true;
			}
		}
		
		if (!this.Open) {
			dList = this.Container.find("datalist");
			this.Open = true;
			dList.show();
			this.Container.addClass("open");
			this.BoundWindowClick = $.proxy(this.close,this);
			$("body").click(this.BoundWindowClick);
			
			// If the select drops below the visible area, scroll down a bit.
			dOffset = dList.offset().top + dList.height();
			toScroll = dOffset - window.scrollY - $(window).height();
			if (toScroll > 0) {
				$('html, body').animate({ scrollTop: window.scrollY + toScroll + 5 }, 200);
			}
			
		} else {
			this.Open = false;
			this.Container.removeClass("open");
			this.Container.find("datalist").hide();
			$("body").unbind("click",this.BoundWindowClick);
		}

		return false;
	}