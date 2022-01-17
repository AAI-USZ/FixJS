function (title) {
    /* put this frame in a popup */
    this.elm.dialog({
        'modal': false,
        'title': title,
        'close': function(ev, ui) {
                    this.close();
                 }.bind(this),
        'width': 'auto',
        'height': 'auto'
    });
    
    // make sure the popup is in the window
    if (this.elm.height() > window.innerHeight*.8) {
        this.elm.height(window.innerHeight*.8);
    }
    if (this.elm.width() > window.innerWidth*.8) {
        this.elm.width(window.innerWidth*.8);
    }
    var off  = this.elm.offset(),
        top  = off.top,
        left = off.left;
    if (top < 0 || top > window.innerHeight) {
        this.elm.dialog({ position: "top" });
    }
    if (left < 0 || left > window.innerWidth) {
        this.elm.dialog({ position: "left" });
    }
}