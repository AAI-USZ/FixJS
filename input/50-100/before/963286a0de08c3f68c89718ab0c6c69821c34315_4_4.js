function xp_ext_get_dimensions() {
    scroller_width = 17;
    if (navigator.platform.substr(0,3)=='Mac') {
        scroller_width = 16;
    }

    (kndShrinkMode)?subtableCount=2:subtableCount=3;
    subtableWidth = (pageWidth()-10)/subtableCount-7 ;
    
    xp_w = pageWidth()-24;
    xp_h = pageHeight()-274-headerHeight()-28;
}