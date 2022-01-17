function (event) {
        var subpanel_href,
            subpanel_name,
            ajax_panelpage;

        if (event.target.nodeName === "A" && event.target.className.match('content_add_remove')) {
            return false;
        } else {
            activeBlock = $(this);
            ajax_url = activeBlock.attr("data-ajax_url");
            activeBlockId = activeBlock.attr('id');
            ajax_panelpage = activeBlock.attr("data-ajax_panelpage");

            // If the panel is currently open, get the currently open tab
            if (thisPanel.hasClass('opened') && $.bbq.getState("panel") !== "new") {
                subpanel_href = $('.panel_link.selected > a').attr('href');
                if (subpanel_href) {
                    last_ajax_panelpage = subpanel_href.substr(subpanel_href.lastIndexOf('/') + 1);
                }
            }

            if (last_ajax_panelpage === "new") {
                last_ajax_panelpage = undefined;
            }

            if(event.ctrlKey && !thisPanel.hasClass('opened') && !(event.target.id == "new") && !activeBlock.hasClass('active')) {
                if (activeBlock.hasClass('active')) {
                    activeBlock.removeClass('active');
                } else {
                    activeBlock.addClass('active');
                    activeBlock.find('.arrow-right').hide();
                }
            } else if (event.ctrlKey && !thisPanel.hasClass('opened') && !(event.target.id == "new") && activeBlock.hasClass('active') && $('.block.active').length > 1) {
              activeBlock.removeClass('active');
            } else {
                if(activeBlock.hasClass('active') && thisPanel.hasClass('opened')){
                    KT.panel.closePanel(thisPanel);
                } else {
                    if (ajax_panelpage && $.bbq.getState("panel") !== "new" && !last_ajax_panelpage) {
                        last_ajax_panelpage = ajax_panelpage;
                    }
                    if (last_ajax_panelpage) {
                        $.bbq.pushState({
                            panel: activeBlockId,
                            panelpage: last_ajax_panelpage
                        });
                    } else {
                        $.bbq.removeState('panelpage');
                        $.bbq.pushState({
                            panel: activeBlockId
                        });
                    }
                    activeBlock.find('.arrow-right').show();
                }
            }
            //update the selected count
            KT.panel.updateResult();
            return false;
        }
    }