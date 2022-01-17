function(e) {
            var layout_pane = jQuery('.ui-layout-'+e);
            jQuery(layout_pane.find('.ui-tabs-panel').each(function() {
                var panel = jQuery(this);
                panel.width(layout_pane.width());
                panel.height(layout_pane.height()-panel.position().top);
                //debug.info('layout resized',this,layout_pane.width(),
                //            layout_pane.height()-panel.position().top);
            }));
        }