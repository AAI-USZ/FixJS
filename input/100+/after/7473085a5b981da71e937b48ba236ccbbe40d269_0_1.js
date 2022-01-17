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

    // give it a few ms to render then check for being out of bounds
    var dlg = this.elm;
    setTimeout(function() {
        var off  = dlg.offset(),
            top  = off.top,
            left = off.left;
        if (top < 0) {
            top = 0;
        }
        else if (top + dlg.outerHeight() > window.innerHeight) {
            top = window.innerHeight - dlg.outerHeight();
        }
        if (left < 0) {
            left = 0;
        }
        else if (left + dlg.outerWidth() > window.innerWidth) {
            left = window.innerWidth - dlg.outerWidth();
        }
        if (top !== off.top || left !== off.left) {
            dlg.dialog({ position: [top, left] });
        }
    },25);
}