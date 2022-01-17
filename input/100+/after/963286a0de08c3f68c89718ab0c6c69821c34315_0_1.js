function adminPanel_extension_resize() {

	scroller_width = 14;
	if (navigator.platform.substr(0,3)=='Mac') {
	    scroller_width = 16;
	}
	
	pagew = pageWidth();
	drittel = (pagew-10)/3 - 7 ;
	
	panel_w = pagew-24;
	panel_h = pageHeight()-10-headerHeight();
	
	$(".adminPanel_extension_subtab").css("display", "none");
	    
	$("#adminPanel_extension_panel").css("width", panel_w);
	$(".adminPanel_extension_panel_header").css("width", panel_w);
	$("#adminPanel_extension_panel").css("height", panel_h);
	
	$(".adminPanel_extension_subtab").css("height", panel_h - (7*25)-20-1);
	
    adminPanel_extension_subtab_autoexpand();
}