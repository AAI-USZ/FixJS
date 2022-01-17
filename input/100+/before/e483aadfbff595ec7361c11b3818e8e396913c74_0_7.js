function ( ) {
	var segmentedPager = $("segmentedcontrol[ui-implements=segmented-paging]");
	var pagingOrientation = segmentedPager.attr("ui-paging");
	segmentedPager.attr("ui-paged-subview", 0);
	segmentedPager.children().eq(0).addClass("disabled");
	var subviews = $(this).find("subview");
	segmentedPager.attr("ui-pagable-subviews", subviews.length);
	var childPosition = 0;
	subviews.each(function(idx) {
		$(this).attr("ui-navigation-status", "upcoming");
		$(this).attr("ui-child-position", childPosition);
		childPosition++;
		$(this).attr("ui-paging-orient", pagingOrientation);
	});
	subviews.eq(0).attr("ui-navigation-status", "current");
	segmentedPager.delegate("uibutton", "click", function() {
		if ($(this).hasClass("disabled")) {return;}
		var pager = $(this).closest("segmentedcontrol");
		if ($(this)[0].isSameNode($(this)[0].parentNode.firstElementChild)) {
			if (pager.attr("ui-paged-subview") === 1) {
				$(this).addClass("disabled");
				pager.attr("ui-paged-subview", 0);
				subviews[0].attr("ui-navigation-status", "current");
				subviews[1].attr("ui-navigation-status", "upcoming");
			} else {
				subviews.eq(pager.attr("ui-paged-subview") - 1 ).attr( "ui-navigation-status", "current");
				subviews.eq(pager.attr("ui-paged-subview")).attr("ui-navigation-status", "upcoming");
				pager.attr("ui-paged-subview", pager.attr("ui-paged-subview")-1);
				$(this).next().removeClass("disabled");
				if (pager.attr("ui-paged-subview") <= 0) {
					$(this).addClass("disabled");
				}
			}
		} else {
			var pagableSubviews = pager.attr("ui-pagable-subviews");
			var pagedSubview = pager.attr("ui-paged-subview");
			if (pager.attr("ui-paged-subview") == pagableSubviews-1) {
				$(this).addClass("disabled");
			} else {
				$(this).prev().removeClass("disabled");
				subviews.eq(pagedSubview).attr("ui-navigation-status", "traversed");
				subviews.eq(++pagedSubview).attr("ui-navigation-status", "current");
				pager.attr("ui-paged-subview", (pagedSubview));
				if (pager.attr("ui-paged-subview") == pagableSubviews-1) {
					$(this).addClass("disabled");
				}
			}
		}
	});
	return this;
}