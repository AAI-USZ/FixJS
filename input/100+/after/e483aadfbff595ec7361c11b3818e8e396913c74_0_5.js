function( selector, opts ) {
		var myPager = new iScroll( selector, opts );
        $.UIScrollers["myPager"] = myPager;
		selector = $(selector);
		var stack = selector.find("stack");
		selector.parent().attr("ui-scroller","myPager");
		var panels = stack.children().length;
		var indicatorsWidth = selector.parent().css("width");
		var indicators = '<stack ui-implements="indicators" class="indicators" style="width:"' + indicatorsWidth + ';">';
		for (var i = 0; i < panels; i++) {
			if (i === 0) {
				indicators += '<indicator class="active"></indicator>';
			} else {
				indicators += "<indicator></indicator>";
			}
		}
		indicators += "</stack>";
		// The maximum number of indicators in portrait view is 17.
		selector.parent().parent().append(indicators);
		return this;
	}