function ( ) {
	var tabs = $("tabbar > uibutton[ui-implements=tab]", $(this));
	$("tabbar", $(this)).UIIdentifyChildNodes();
	var tabbar = $("tabbar", $(this));
	var subviews = $("subview", $(this));
	subviews.addClass("unselected");
	var selectedTab = tabbar.attr("ui-selected-tab") || 0;
	subviews.eq(selectedTab).toggleClassName("unselected","selected");
	tabs.eq(selectedTab).addClass("selected");
	tabs.each(function(idx) {
		$(this).bind("click", function() {
			if ($(this).hasClass("disabled") || $(this).hasClass("selected")) {
				return;
			}
			var whichTab = $(this).closest("tabbar").attr("ui-selected-tab");
			tabs.eq(whichTab).removeClass("selected");
			$(this).addClass("selected");
			subviews.eq(whichTab).removeClass("selected");
			subviews.eq(whichTab).addClass("unselected");
			subviews.eq($(this).attr("ui-child-position")).addClass("selected");
			subviews.eq($(this).attr("ui-child-position")).removeClass("unselected");
			tabbar.attr("ui-selected-tab", $(this).attr("ui-child-position"));
		});
	});
}