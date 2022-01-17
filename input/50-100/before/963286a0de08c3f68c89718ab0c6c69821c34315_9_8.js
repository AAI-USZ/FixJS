function lists_get_dimensions() {
    scroller_width = 17;
    if (navigator.platform.substr(0,3)=='Mac') {
        scroller_width = 16;
    }

    subtableCount=4;
    if (kndShrinkMode) {
      subtableCount--;
    }
    if (usrShrinkMode) {
      subtableCount--;
    }
    subtableWidth = (pageWidth()-10)/subtableCount-7;

    usr_w = subtableWidth-5;
    knd_w = subtableWidth-5; // subtract the space between the panels
    pct_w = subtableWidth-6;
    evt_w = subtableWidth-5;
}