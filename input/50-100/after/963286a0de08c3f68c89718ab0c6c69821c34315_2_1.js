function expense_extension_get_dimensions() {
    scroller_width = 17;
    if (navigator.platform.substr(0,3)=='Mac') {
        scroller_width = 16;
    }

    (customerShrinkMode)?subtableCount=2:subtableCount=3;
    subtableWidth = (pageWidth()-10)/subtableCount-7 ;
    
    expenses_width = pageWidth()-24;
    expenses_height = pageHeight()-224-headerHeight()-28;
}