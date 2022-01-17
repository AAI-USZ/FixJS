function ( opts ) {
	var id = opts.id || $.UIUuid();
	var imagePath = opts.imagePath || "icons\/";
	var numberOfTabs = opts.numberOfTabs || 1;
	var tabLabels = opts.tabLabels;
	var iconsOfTabs = opts.iconsOfTabs;
	var selectedTab = opts.selectedTab || 0;
	var disabledTab = opts.disabledTab || null;
	var tabbar = "<tabbar ui-selected-tab='" + selectedTab + "'>";
	$(this).attr("ui-tabbar-id", id);
	for (var i = 0; i < numberOfTabs; i++) {
		tabbar += "<uibutton ui-implements='tab' ";
		if (i === selectedTab || i === disabledTab) {
			tabbar += "class='";
			if (i === selectedTab) {
				tabbar += "selected";
			}
			if (i === disabledTab) {
				tabbar += "disabled";
			}
			tabbar += "'";
		}
        if(iconsOfTabs[i].indexOf(".png") > -1){
            tabbar += "><icon style='background-image: url(" + iconsOfTabs[i] + ");'></icon>";
        }
        else{
            tabbar += "><icon style='-webkit-mask-box-image: url(" + imagePath;
            tabbar += iconsOfTabs[i] + ".svg);'></icon>";
        }
		tabbar += "<label>" + tabLabels[i] + "</label></uibutton>";
	}
	tabbar += "</tabbar>";
	$(this).append(tabbar);
	var subviews = $("subview", $(this));
	subviews.eq(selectedTab).addClass("selected");
	this.UITabBar();
}