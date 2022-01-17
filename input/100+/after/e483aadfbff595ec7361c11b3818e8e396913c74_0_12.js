function( container, callback ) {
	var that = $(this);
	var val = 0;
	callback = callback || function(){};
	var buttons = $(this).children();
	var cont = $(container);
	if (!$(this).attr('ui-selected-segment')) {
		$(this).attr("ui-selected-segment", "");
	}
	if ($(this).attr("ui-selected-index")) {
		val = $(this).attr("ui-selected-index");
		var seg = this.children().eq(val);
		try {
			seg = seg.attr("id");
			$(this).attr("ui-selected-segment", seg);
			$(this).children().eq(val).addClass("selected");
		} catch(e) {}
	} else {
		var checkChildNodesForAttr = 0;
		for (var i = 0, len = $(this).children().length; i < len; i++) {
			if ($(this).children().eq(i).hasClass("selected")) {
				$(this).attr("ui-selected-index", i);
			} else {
				checkChildNodesForAttr++;
			}
		}
		if (checkChildNodesForAttr === $(this).children().length-1) {
			$(this).attr("ui-selected-index", 0);
			$(this).children().eq(0).addClass("selected");
		}
	}
	if (container) {
		container = $(container);
		if (val) { 
			container.attr("ui-selected-index", val);
		} else {
			container.attr("ui-selected-index", 0);
		}
		container.children().css("display: none;");
		container.children().eq(val).css("display","block");
		that.attr("ui-segmented-container", ("#" + container.attr("id")));
		var selectedIndex = this.attr("ui-selected-index");
		var whichScroller = container.closest("scrollpanel").attr("ui-scroller");
		$.UIScrollers[whichScroller].refresh();
	}

	buttons.each(function() {
		var that = $(this).closest("segmentedcontrol");
		if (!$(this).attr("id")) {
			$(this).attr("id", $.UIUuid());
		}
		if (!that.attr("ui-selected-segment")) {
			if ($(this).hasClass("selected")) {
				that.attr("ui-selected-segment", $(this).attr("id"));
			}
		}
		$(this).bind(window.tapOrClick, function() {
			var selectedSegment = that.attr("ui-selected-segment");
			var selectedIndex = that.attr("ui-selected-index");
			var uicp = $(this).attr("ui-child-position");
			var container = null;
			var segmentedcontrol = $(this).closest("segmentedcontrol");
			if (segmentedcontrol.attr("ui-segmented-container")) {
				container = $(segmentedcontrol.attr("ui-segmented-container"));
			}
			var uisi = null;
			if (selectedSegment) {
				uisi = $(this).attr("ui-child-position");
				that.attr("ui-selected-index", uisi);
				var oldSelectedSegment = $(("#" + selectedSegment));
				oldSelectedSegment.removeClass("selected");
				that.attr("ui-selected-segment", $(this).attr("id"));
				$(this).addClass("selected");
				childPosition = $(this).attr("ui-child-position");
				container.attr("ui-selected-index", uicp);
				container.children().eq(selectedIndex).css("display", "none");						
				container.children().eq(uicp).css("display","-webkit-box");
				var whichScroller = container.closest("scrollpanel").attr("ui-scroller");
				$.UIScrollers[whichScroller].refresh()
			}
			$(this).addClass("selected");
				callback.call(callback, $(this));
		});
	});
	$(this).UIIdentifyChildNodes();
}