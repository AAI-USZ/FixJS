function ( ) {
	var tabs = $("tabbar > uibutton[ui-implements=tab]", $(this));
	$("tabbar", $(this)).UIIdentifyChildNodes();
	var tabbar = $("tabbar", $(this));
	var subviews = $("subview", $(this));
	subviews.addClass("unselected");
	var selectedTab = tabbar.attr("ui-selected-tab") || 0;
	subviews.eq(selectedTab).toggleClassName("unselected","selected");
    $.currentTabSubViewId = subviews.eq(selectedTab).attr("id");
    //console.log("current subview selected: " + $.currentTabSubViewId);
	tabs.eq(selectedTab).addClass("selected");
    subviews.eq(selectedTab).trigger("TabContent_Show", [tabs.eq(selectedTab)]);
	tabs.each(function(idx) {
		$(this).bind(window.tapOrClick, function() {
			if ($(this).hasClass("disabled") || $(this).hasClass("selected")) {
				return;
			}
			var whichTab = $(this).closest("tabbar").attr("ui-selected-tab");
			tabs.eq(whichTab).removeClass("selected");
			$(this).addClass("selected");
            //for the subview being hidden dispatch the TabContent_Hide
            var subviewBeingHidden = subviews.eq(whichTab);
			subviewBeingHidden.removeClass("selected").addClass("unselected");
            subviewBeingHidden.trigger("TabContent_Hide", [tabs.eq(whichTab)]);
                     
            var subviewBeingRevealed = subviews.eq($(this).attr("ui-child-position"));
			//subviews.eq(whichTab).addClass("unselected");
            $.currentTabSubViewId = subviewBeingRevealed.attr("id");
            //console.log("current subview selected: " + $.currentTabSubViewId);
			subviewBeingRevealed.addClass("selected").removeClass("unselected");
            subviewBeingRevealed.trigger("TabContent_Show", [$(this)]);
			//subviews.eq($(this).attr("ui-child-position")).removeClass("unselected");
			tabbar.attr("ui-selected-tab", $(this).attr("ui-child-position"));
		});
	});
}