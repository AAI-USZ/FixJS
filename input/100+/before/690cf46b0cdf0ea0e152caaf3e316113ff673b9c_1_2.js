function() {
    if (this.highlighted) {
        YAHOO.util.Dom.removeClass(this.getEl(), 'current');
        this.highlightButton.childNodes[0].src = main.portal.icons['marker'];
        this.highlightButton.title = main.getString('marker', this.sectionId);
        this.highlighted = false;
    } else {
        YAHOO.util.Dom.addClass(this.getEl(), 'current');
        this.highlightButton.childNodes[0].src = main.portal.icons['marked'];
        this.highlightButton.title = main.getString('marked', this.sectionId);
        this.highlighted = true;
    }
}