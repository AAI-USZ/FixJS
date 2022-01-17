function() {
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
		}