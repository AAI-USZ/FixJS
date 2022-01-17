function(actionSheetID) {
		$.app.data("ui-action-sheet-id", actionSheetID);
		$.app.UIBlock();
		var screenCover = $("mask");
		screenCover.css({width: window.innerWidth, height: window.innerHeight, opacity: ".5"});
		screenCover.attr("ui-visible-state", "visible");
		$(actionSheetID).removeClass("hidden");
		screenCover.bind("touchmove", function(e) {
			e.preventDefault();
		});
		var whichScroller = $(actionSheetID).find("scrollpanel").attr("ui-scroller");
		$.UIScrollers[whichScroller].refresh();
	}