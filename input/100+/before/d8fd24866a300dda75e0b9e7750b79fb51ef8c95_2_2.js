function ($) {
    var retrievingNewContent= false,
        control_bbq = true,
        current_scroll = 0,
        panels_list = [],
        left_list_content = "",
        expand_cb = [],
        search = undefined,
        //callback after a pane is loaded
        contract_cb = function () {},
        switch_content_cb = function () {},
        select_item = function (activeBlockId) {
            var activeBlock = $('#' + KT.common.escapeId(activeBlockId)),
                ajax_url = activeBlock.attr("data-ajax_url"),
                ajax_panelpage = activeBlock.attr("data-ajax_panelpage"),
                full_ajax_url,
                previousBlockId = null;

            if (ajax_panelpage) {
                // Initialize the default panelpage
                if (!last_ajax_panelpage) {
                    last_ajax_panelpage = ajax_panelpage;
                }
                full_ajax_url = ajax_url + '/' + last_ajax_panelpage;
            } else {
                full_ajax_url = ajax_url;
            }

            thisPanel = $("#panel");
            subpanel = $('#subpanel');
            if (activeBlock.length) {
                if (!thisPanel.hasClass('opened') && thisPanel.attr("data-id") !== activeBlockId) {
                    $('.block.active').removeClass('active');
                    // Open the Panel                           /4

                    handleScroll($('#panel-frame'));

                    thisPanel.css({
                        "z-index": "200"
                    });
                    thisPanel.parent().css({
                        "z-index": "20"
                    });
                    thisPanel.animate({
                        left: (panelLeft) + "px",
                        opacity: 1
                    }, 200, function () {
                        $(this).css({
                            "z-index": "200"
                        });
                    }).removeClass('closed').addClass('opened').attr('data-id', activeBlockId);
                    activeBlock.addClass('active');
                    previousBlockId = activeBlockId;
                    panelAjax(activeBlockId, full_ajax_url, thisPanel, false);
                }
                else if (thisPanel.hasClass('opened') && thisPanel.attr("data-id") !== activeBlockId) {
                    switch_content_cb();
                    $('.block.active').removeClass('active');
                    closeSubPanel(subpanel); //close the subpanel if it is open
                    // Keep the thisPanel open if they click another block
                    // remove previous classes besides opened
                    thisPanel.css({
                        "z-index": "200"
                    });
                    thisPanel.parent().css({
                        "z-index": "20"
                    });
                    thisPanel.addClass('opened').attr('data-id', activeBlockId);
                    $("#" + previousBlockId).removeClass('active');
                    activeBlock.addClass('active');
                    previousBlockId = activeBlockId;
                    thisPanel.removeClass('closed');
                    panelAjax(activeBlockId, full_ajax_url, thisPanel, false);
                }
            }
        },
        panelAjax = function (name, ajax_url, thisPanel, isSubpanel) {
            var spinner = thisPanel.find('.spinner'),
                panelContent = thisPanel.find(".panel-content");
            spinner.show();
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
        },
        /* must pass a jQuery object */
        panelResize = function (paneljQ, isSubpanel) {
            if (paneljQ.length > 0) {
                adjustHeight(paneljQ, isSubpanel);
            }
            return paneljQ;
        },
        adjustHeight = function (paneljQ, isSubpanel) {
            var leftPanel = $('.left'),
                tupane_panel = $('#panel'),
                new_top = Math.floor($('.list').offset().top - 60),
                header_spacing = tupane_panel.find('.head').height(),
                subnav_spacing = tupane_panel.find('nav').height() + 10,
                content_spacing = paneljQ.height(),
                panelFrame = paneljQ.parent().parent().parent().parent(),
                tupane_header = $('.tupane_header').height() || 0,
                tupane_footer = $('.tupane_footer').height() || 0,
                extraHeight = 0,
                window_height = $(window).height(),
                container_offset = $('#container').offset().top,
                subpanelnav,
                height,
                default_height = 565,
                default_spacing = header_spacing + subnav_spacing + tupane_header + tupane_footer + 30;

            if (window_height <= (height + 80) && leftPanel.height() > 550) {
                height = window_height - container_offset - default_spacing;
            } else if( leftPanel.height() > 575 ){
                if( leftPanel.height() < window_height ){
                    height = leftPanel.height() - default_spacing;
                } else {
                    height = window_height - container_offset - default_spacing;
                }
            } else {
                height = default_height - default_spacing + 20;
            }
            if (isSubpanel) {
                subpanelnav = ($('#subpanel').find('nav').length > 0) ? $('#subpanel').find('nav').height() + 10 : 0;
                height = height - subpanelSpacing * 2 - subpanelnav + subnav_spacing;
            }

            paneljQ.height(height);

            if (paneljQ.length > 0) {
                paneljQ.data('jsp').reinitialise();
            }
        },
        closePanel = function (jPanel) {
            var jPanel = jPanel || $('#panel'),
                content = jPanel.find('.panel-content'),
                position;
            if (jPanel.hasClass("opened")) {
                KT.panel.copy.hide_form();
                $('.block.active').removeClass('active');
                jPanel.animate({
                    left: 0,
                    opacity: 0
                }, 400, function () {
                    $(this).css({
                        "z-index": "-1"
                    });
                }).removeClass('opened').addClass('closed').attr("data-id", "");
                content.html('');
                position = KT.common.scrollTop();
                $.bbq.removeState("panel");
                $.bbq.removeState("panelpage");
                $(window).scrollTop(position);
                updateResult();
                contract_cb(name);
                closeSubPanel(subpanel);
            }
            return false;
        },
        closeSubPanel = function (jPanel) {
            if (jPanel.hasClass("opened")) {
                jPanel.animate({
                    left: 0,
                    opacity: 0
                }, 400, function () {
                    $(this).css({
                        "z-index": "-1"
                    });
                    $(this).removeClass('opened').addClass('closed');
                });
                updateResult();
            }
            return false;
        },
        updateResult = function(){
            //calc the number of active tupane rows
            var len = $('.block.active').length;
            //update the select
            $('#select-result').html(len + i18n.items_selected).effect("highlight", {}, 200);
            $('.numitems').html(len).effect("highlight", {}, 200);
            actions.resetActions(len);
            return len;
        },
        getSelected = function() {
            var to_ret = [];
            $('.block.active').each(function(){
                var id = $(this).attr("id");
                to_ret.push(id.split("_")[1]);
            });
            return to_ret;
        },
        numSelected = function() {
            return $('.block.active').length;
        },
        openSubPanel = function (url) {
            var thisPanel = $('#subpanel');
            thisPanel.animate({
                left: panelLeft + "px",
                opacity: 1
            }, 200, function () {
                $(this).css({
                    "z-index": "204"
                });
                $(this).parent().css({
                    "z-index": "2"
                });
                $(this).removeClass('closed').addClass('opened');
            });
            panelAjax('', url, thisPanel, true);
        },
        handleScroll = function (jQPanel, offset) {
            var scrollY = KT.common.scrollTop(),
                scrollX = KT.common.scrollLeft(),
                isFixed = jQPanel.css('position') === 'fixed',
                container = $('#container'),
                bodyY = parseInt(container.position().top, 10),
                left_panel = container.find('.left'),
                left_bottom_pos = left_panel.offset().top + left_panel.height(),
                top;

            top_position = left_panel.offset().top;
            offset = offset ? offset : 10;
            offset += $('#maincontent .maincontent').offset().left;
            offset -= scrollX;

            if (jQPanel.length > 0) {
                if (scrollY <= container.offset().top) {
                    top = (container.offset().top - scrollY <= 30 && container.offset().top - scrollY >= -30) ? 30 : top_position - scrollY;

                    jQPanel.css({
                        position: 'fixed',
                        top: top,
                        left: offset
                    });
                }
                else {
                    if ( left_bottom_pos - (jQPanel.offset().top + jQPanel.height()) <= 40 ) {
                        jQPanel.css({
                            position: 'fixed',
                            top: (left_bottom_pos - jQPanel.height()) - scrollY,
                            left: offset
                        });
                    } else {
                        jQPanel.stop().css({
                            position: 'fixed',
                            top: 30,
                            left: offset
                        });
                    }
                }
            }
        },
        handleScrollResize = function (jQPanel, offset) {
            var scrollX = KT.common.scrollLeft();

            offset = offset ? offset : 10;
            offset += $('#maincontent .maincontent').offset().left;
            offset -= scrollX;

            if (jQPanel.length > 0) {
                if (jQPanel.css('position') === 'fixed') {
                    jQPanel.css('left', offset);
                }
            }
        },
        search_started = function (event, promise) {
            var refresh = $.bbq.getState("panel");
            if (!last_ajax_panelpage) {
                last_ajax_panelpage = $.bbq.getState("panelpage");
            }

            if (refresh) {
                if (promise) {
                    closePanel();
                    promise.done(function(){
                        $('.left').resize();
                        select_item(refresh);
                    });
                }
                else {
                    select_item(refresh);
                }
            }
            else {
                closePanel();
            }
            return false;
        },
        registerPanel = function (jQPanel, offset) {
            var new_panel = {
                panel: jQPanel,
                offset: offset
            };
            $(window).scroll(function (event) {
                if( event.target === document){
                    handleScroll(jQPanel, offset);
                }
            });
            $(window).resize(function () {
                handleScrollResize(jQPanel, offset);
            });
            $(document).bind('helptip-closed', function () {
                handleScroll(jQPanel, offset);
            });
            $(document).bind('helptip-opened', function () {
                handleScroll(jQPanel, offset);
            });

            panels_list.push(new_panel);
        },
        registerSubPanelSubmit = function(form_id, form_submit_id) {
            form_id.bind('ajax:beforeSend', function(){
               form_submit_id.addClass('disabled');
            }).bind("ajax:complete", function(){
               form_submit_id.removeClass('disabled');
            }).bind("ajax:success", function(){
                KT.panel.closeSubPanel($('#subpanel'));
                KT.panel.refreshPanel();
            }).bind("ajax:error", function(){
               //validation notice appears
            });
        },
        // http://devnull.djolley.net/2010/11/accessing-query-string-parameters-from.html
        queryParameters = function () {
            var queryString = new Object;
            var qstr = window.location.search.substring(1);
            var params = qstr.split('&');
            $.each(params, function(index, item){
                var pair=item.split('=');
                if(pair[1]) {
                    queryString[pair[0]]=decodeURI(pair[1]);
                }
            });
            return queryString;
        },
        refreshPanel = function() {
          var active = $('#list').find('.active');
          KT.panel.panelAjax(active, active.attr("data-ajax_url"), $('#panel'), false);
        },
        actions = (function(){
            var action_list = {},
                current_request_action = undefined;

            var registerDefaultActions = function() {
                var actions = $(".panel_action");
                actions.each(function(index){
                    var action = $(this);
                    var options = action.find(".options");
                    action.find(".request_action").click(function() {
                        var params = action_list[action.attr("data-id")],
                            valid = true;

                        current_request_action = $(this);
                        if(params.valid_input_cb) {
                            // Has the user provided valid input for the request?
                            valid = params.valid_input_cb(current_request_action);
                        }
                        if (valid && !action.hasClass("disabled")) {
                            options.slideDown('fast');
                        }
                    });
                    action.find(".cancel").click(function() {
                        if ($(this).hasClass("disabled")){return}
                        options.slideUp('fast');
                    });
                    action.find(".trigger").click(function() {
                        var params = action_list[action.attr("data-id")];
                        var success = function() {
                            options.slideUp('fast');
                            action.find("input").removeClass("disabled");
                            if (params.success_cb){
                                params.success_cb(getSelected());
                            }
                        };
                        var error = function() {
                          action.find("input").removeClass("disabled");
                          if(params.error_cb) {
                              params.error_cb(getSelected());
                          }
                        };

                        if ($(this).hasClass("disabled")){return}

                        if(params.ajax_cb) {
                            params.ajax_cb(getSelected(), current_request_action, options);
                        }
                        else {
                            $.ajax({
                                cache: 'false',
                                type: params.method,
                                url: params.url,
                                data: {ids:getSelected()},
                                success: success,
                                error: error
                            });
                        }
                        if (getSelected() === 0) {
                            action.find("input").addClass("disabled");
                        }
                    });
                });
                updateResult();
            },
            registerAction = function(name, params) {
                /**
                 * params:
                 *    success_cb(data, selected_ids)
                 *    error_cb(data, selected_ids)
                 *    url      //URL for ajax call
                 *    method   //METHOD for ajax call
                 *    unselected_action // true if the action is 'doable' even if
                 *    ajax_cb(id_list, request_action, options, success_cb, error_cb)  //To manually do the ajax call yourself
                 *    valid_input_cb() // to validate the input for the request... return true if valid; otherwise, false
                 *    enable_cb()  // callback to provide custom initialization logic when 1 or more elements are selected
                 *    disable_cb() // callback to provide custom logic when all elements are cleared (i.e. select none)
                 */
              action_list[name] = params;
            },
            resetActions = function(num) {
              $.each(action_list, function(name, params){
                  if(!params.unselected_action) {
                    var div = $("[data-id=" + name + "]");
                    if (num > 0) {
                        div.removeClass("disabled");
                        if (params.enable_cb) {
                            params.enable_cb();
                        }
                    }
                    else {
                        div.addClass("disabled");
                        if (params.disable_cb) {
                            params.disable_cb();
                        }
                    }
                  }
              });
              var actions = $(".panel_action");
              actions.each(function(index){
                var action = $(this);
                action.find('.cancel').click();
              });
            };

            return {
                registerAction: registerAction,
                registerDefaultActions: registerDefaultActions,
                resetActions: resetActions
            }
        })();
    return {
        set_expand_cb: function (callBack) {
            expand_cb.push(callBack);
        },
        get_expand_cb: function () {
            return expand_cb;
        },
        set_contract_cb: function (callBack) {
            contract_cb = callBack;
        },
        set_switch_content_cb: function (callBack) {
            switch_content_cb = callBack;
        },
        select_item: select_item,
        numSelected: numSelected,
        search_started: search_started,
        openSubPanel: openSubPanel,
        updateResult: updateResult,
        closeSubPanel: closeSubPanel,
        closePanel: closePanel,
        panelResize: panelResize,
        panelAjax: panelAjax,
        control_bbq: control_bbq,
        registerPanel: registerPanel,
        registerSubPanelSubmit: registerSubPanelSubmit,
        queryParameters: queryParameters,
        refreshPanel : refreshPanel,
        actions: actions,
        handleScroll : handleScroll
    };
}