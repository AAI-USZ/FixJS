function () {
    $('.left').resize(function () {
        var apanel = $('.panel');
        panelLeft = $(this).width();
        $('.block').not('#new').width(panelLeft - 17);
        apanel.width(940 - panelLeft);
        $('.right').width(898 - panelLeft);
        if (apanel.hasClass('opened')) {
            apanel.css({
                "left": (panelLeft)
            });
        }
        $('.list-title').width(panelLeft);
        $('#list-title').width(panelLeft);
        if ($(this).hasClass('column_panel_3')) {
            var fontsize = Math.floor((panelLeft / 430) * 100);
            //if it's bigger than 100%, make it 100%.
            fontsize = (fontsize > 100) ? 100 : fontsize;
            $('#systems .block').css({
                "font-size": parseInt(fontsize, 10) + "%"
            });
        }
    }).resize();
    //$('#list .block').linkHover({"timeout":200});
    thisPanel = $("#panel");
    subpanel = $('#subpanel');
    var activeBlock = null;
    var activeBlockId = null;
    var ajax_url = null;
    var panel_selected;


    $('.block').live('click', function (event) {
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
                subpanel_href = $('.panel_link.selected > a').last().attr('href');
                if (subpanel_href) {
                    last_ajax_panelpage = KT.panel.extract_panelpage(subpanel_href);
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
    });
    $('.close').live("click", function () {
        if ($(this).attr("data-close") === "panel" || ($(this).attr("data-close") !== "subpanel" && $(this).parent().parent().hasClass('opened'))) {
            KT.panel.closePanel(thisPanel);
            KT.panel.closeSubPanel(subpanel);
        }
        else { //closing the subpanel
            KT.panel.closeSubPanel(subpanel);
        }
        return false;
    });

    $(window).resize(function () {
        KT.panel.panelResize($('#panel_main'), false);
        KT.panel.panelResize($('#subpanel_main'), true);
    });
    $('.subpanel_element').live('click', function () {
        KT.panel.openSubPanel($(this).attr('data-url'));
    });

    // It is possible for the pane (e.g. right) of a panel to contain navigation
    // links.  When that occurs, it should be possible to click the navigation
    // link and only that pane reflect the transition to the new page. The element
    // below helps to facilitate that by binding to the click event for a navigation
    // element with the specified id, sending a request to the server using the link
    // selected and then replacing the content of the pane with the response.
    $('.panel_link > a').live('click', function () {
        // if a view is a pane within a panel
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
    });
    $('.left').resizable({
        maxWidth: 550,
        minWidth: 350,
        grid: 25,
        handles: 'e',
        autoHide: true
    });

    //register a common select none action
    KT.panel.actions.registerAction("select_none", {});
    $('#select-none').mouseup(function(){
        $('.block.active').removeClass('active');
        KT.panel.updateResult();
    });
    //create the initial selected count
    KT.panel.updateResult();
    //register the default actions for the page's actions partial
    KT.panel.actions.registerDefaultActions();


}