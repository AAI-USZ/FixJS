function(idx, item) {
				item.attr("ui-scroller", $.UIUuid());
				var whichScroller = item.attr("ui-scroller");
				$.UIScrollers[whichScroller] = new iScroll(item.parentNode);
			}