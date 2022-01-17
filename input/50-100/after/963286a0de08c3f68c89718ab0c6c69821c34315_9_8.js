function lists_get_dimensions() {
    scroller_width = 17;
    if (navigator.platform.substr(0,3)=='Mac') {
        scroller_width = 16;
    }

    subtableCount=4;
    if (customerShrinkMode) {
      subtableCount--;
    }
    if (userShrinkMode) {
      subtableCount--;
    }
    subtableWidth = (pageWidth()-10)/subtableCount-7;

    userColumnWidth = subtableWidth-5;
    customerColumnWidth = subtableWidth-5; // subtract the space between the panels
    projectColumnWidth = subtableWidth-6;
    activityColumnWidth = subtableWidth-5;
}