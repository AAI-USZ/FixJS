function (title) {
    /* put this frame in a popup */
    this.elm.dialog({
        'modal': false,
        'title': title,
        'close': function(ev, ui) {
                    this.close();
                 }.bind(this),
        width:   'auto',
        height:  'auto'
    });
}