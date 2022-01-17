function (title) {
    /* put this frame in a popup */
    var dlg = this.elm;
    dlg.dialog({
        'modal': false,
        'title': title,
        'close': function(ev, ui) {
                    this.close();
                    // if returning to a tab, need to trigger layout to resize
                    jQuery('body').trigger('layoutresizeall');
                 }.bind(this),
        'height': 'auto',
        'width' : 'auto'
    });

    function resize_contents() {
        // resize content pane of all tabbed panes to fit dialog content pane
        var tabs_height = dlg.find('.ui-tabs-nav').height(),
            pane_height = dlg.height()-tabs_height;
            pane_width  = dlg.width()
        dlg.find('.ui-tabs-panel').each(function() {
            var panel = jQuery(this);
            panel.height(pane_height);
            panel.width(pane_width);
            // resize all slickgrid viewports and use viewport for scrolling
            panel.find('.slickgrid').each(function() {
                panel.css('overflow','hidden');
                var grid = jQuery(this),
                    grid_hdr = grid.children('.slick-header'),
                    grid_vwp = grid.children('.slick-viewport');
                grid_vwp.height(panel.innerHeight()-grid_hdr.outerHeight()); 
                grid_vwp.width(panel.innerWidth());
            });
        });
    }

    dlg.bind('dialogresizestop', function(event, ui) {
         resize_contents();
    });

    // make sure the popup fits in the window
    if (this.elm.height() > window.innerHeight*.8) {
        this.elm.height(window.innerHeight*.8);
    }
    if (this.elm.width() > window.innerWidth*.8) {
        this.elm.width(window.innerWidth*.8);
    }

    // give it a few ms to render then check for being out of bounds
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

        resize_contents();
    }, 100);

}