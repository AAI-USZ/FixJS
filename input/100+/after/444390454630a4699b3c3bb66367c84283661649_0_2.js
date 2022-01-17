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