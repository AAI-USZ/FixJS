function(idx) {
		if ($(this).attr("ui-implements") !== "segmented-paging") {
			$(this).UISegmentedControl();
			var whichScroller = $(this).closest("scrollpanel").attr("ui-scroller");
			$.UIScrollers[whichScroller].refresh()
		}
	}