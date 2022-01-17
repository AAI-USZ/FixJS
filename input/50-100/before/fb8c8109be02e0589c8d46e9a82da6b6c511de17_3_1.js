function(e) {
            var layout_pane = jQuery('.ui-layout-'+e);
            debug.info('layout resize',e,layout_pane);
            jQuery(layout_pane.find('.ui-tabs-panel').each(function() {
                var panel = jQuery(this);
                panel.width(layout_pane.width());
                panel.height(layout_pane.height()-panel.position().top);
            }));
        }