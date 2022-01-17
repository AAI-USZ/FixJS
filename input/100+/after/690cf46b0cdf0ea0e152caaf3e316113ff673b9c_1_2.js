function() {
    var strmarker = main.portal.strings['marker'];
    var strmarked = main.portal.strings['marked'];

    if (this.highlighted) {
        YAHOO.util.Dom.removeClass(this.getEl(), 'current');
        this.highlightButton.childNodes[0].src = main.portal.icons['marker'];
        this.highlightButton.childNodes[0].alt = strmarker;
        this.highlightButton.childNodes[0].title = strmarker;   //for IE
        this.highlightButton.title = strmarker;
        this.highlighted = false;
    } else {
        YAHOO.util.Dom.addClass(this.getEl(), 'current');
        this.highlightButton.childNodes[0].src = main.portal.icons['marked'];
        this.highlightButton.childNodes[0].alt = strmarked;
        this.highlightButton.childNodes[0].title = strmarked;   //for IE
        this.highlightButton.title = strmarked;
        this.highlighted = true;
    }
}