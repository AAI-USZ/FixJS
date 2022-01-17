function(e) {
            // resize content pane of all tabbed panes to fill the layout pane
            var layout_pane = jQuery('.ui-layout-'+e),
                tabs_height = layout_pane.find('.ui-tabs-nav').height(),
                pane_height = layout_pane.height()-tabs_height;
                pane_width  = layout_pane.width()
            jQuery(layout_pane.find('.ui-tabs-panel').each(function() {
                var panel = jQuery(this);
                panel.height(pane_height);
                panel.width(pane_width);
            }));
        }