function ap_ext_resize() {

	scroller_width = 14;
	if (navigator.platform.substr(0,3)=='Mac') {
	    scroller_width = 16;
	}
	
	pagew = pageWidth();
	drittel = (pagew-10)/3 - 7 ;
	
	panel_w = pagew-24;
	panel_h = pageHeight()-10-headerHeight();
	
	$(".ap_ext_subtab").css("display", "none");
	    
	$("#ap_ext_panel").css("width", panel_w);
	$(".ap_ext_panel_header").css("width", panel_w);
	$("#ap_ext_panel").css("height", panel_h);
	
	$(".ap_ext_subtab").css("height", panel_h - (7*25)-20-1);
	
    ap_ext_subtab_autoexpand();
}