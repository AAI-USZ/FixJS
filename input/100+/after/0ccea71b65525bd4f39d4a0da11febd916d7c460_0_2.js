function (name, ajax_url, thisPanel, isSubpanel) {
            var spinner = thisPanel.find('.spinner'),
                panelContent = thisPanel.find(".panel-content");

            spinner.show();
            KT.panel.copy.hide_form();
            panelContent.hide();

            $.ajax({
                cache: true,
                url: ajax_url,
                dataType: 'html',
                success: function (data, status, xhr) {
                    var pc = panelContent.html(data);
                    var callback;
                    spinner.hide();
                    pc.fadeIn(function () {
                        $(".panel-content :input:visible:enabled:first").focus();
                    });

                    KT.common.jscroll_init($('.scroll-pane'));
    				        KT.common.jscroll_resize($('.jspPane'));

                    if (isSubpanel) {
                        panelResize($('#subpanel_main'), isSubpanel);
                    } else {
                        panelResize($('#panel_main'), isSubpanel);
                    }

                    KT.panel.copy.initialize();

                    for( callback in expand_cb ){
                    	expand_cb[callback](name);
                    }
                    // Add a handler for ellipsis
                    $(".one-line-ellipsis").ellipsis(true);
                },
                error: function (xhr, status, error) {
                    spinner.hide();
                    panelContent.html("<h2>" + i18n.error + "</h2><p>" + i18n.row_error + error + "</p>").fadeIn();
                }
            });
        }