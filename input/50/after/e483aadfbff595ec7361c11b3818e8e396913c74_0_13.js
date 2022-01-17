function(idx, item) {
				item.setAttribute("ui-scroller", $.UIUuid());
				var whichScroller = item.getAttribute("ui-scroller");
				$.UIScrollers[whichScroller] = new iScroll(item.parentNode);
			}