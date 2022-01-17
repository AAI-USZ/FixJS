function () {
        // if a view is a pane within a panel
        KT.panel.copy.hide_form();
        $.ajax({
            cache: 'false',
            type: 'GET',
            url: $(this).attr('href'),
            dataType: 'html',
            success: function (data) {
                var callbacks = KT.panel.get_expand_cb(),
                    cb = function(){},
                    activeBlock,
                    ajax_url,
                    ajax_panelpage;

                thisPanel.find(".panel-content").html(data);
                KT.common.jscroll_init($('.scroll-pane'));
                KT.common.jscroll_resize($('.jspPane'));
                KT.panel.panelResize($('#panel_main'), false);

                // Update the bbq
                if (!activeBlockId) {
                    activeBlockId = thisPanel.attr("id");
                }
                activeBlock = $('#' + KT.common.escapeId(activeBlockId));
                ajax_url = activeBlock.attr("data-ajax_url");
                ajax_panelpage = activeBlock.attr("data-ajax_panelpage");

                if (ajax_panelpage) {
                    // Replace old ajax_panelpage with new
                    ajax_panelpage = this.url.substr(this.url.lastIndexOf('/') + 1);
                    var bbq_panel = $.bbq.getState("panel");
                    $.bbq.removeState("panel");
                    $.bbq.removeState("panelpage");
                    $.bbq.pushState({
                        panel: bbq_panel,
                        panelpage: ajax_panelpage
                    });
                    // Set the new default panelpage
                    last_ajax_panelpage = ajax_panelpage;
                }

                KT.panel.copy.initialize();
                
                for( cb in callbacks ){
                    callbacks[cb]();
                }
            }
        });
        return false;
    }