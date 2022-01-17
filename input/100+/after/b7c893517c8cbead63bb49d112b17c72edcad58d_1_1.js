function(){
            div = $('#' + KT.common.escapeId(div_id));
            paths_id = "path_select_" + name;
            options.library_select = default_opt(options_in.library_select, true);
            options.inline = default_opt(options_in.inline, false);
            options.select_mode = default_opt(options_in.select_mode, 'none');
            options.button_text = default_opt(options_in.button_text, undefined);
            options.button_event = default_opt(options_in.button_event, ('paths_' + name));
            options.link_first = default_opt(options_in.link_first, true);
            options.expand = default_opt(options_in.expand, true);


            $(div).append(KT.path_select_template.selector(environments, paths_id, options.button_text));
            path_selector = $("#" + paths_id);
            path_selector.find('.node_select').not(':checked').hide();

            if(options.select_mode !== 'none'){
                setup_input_actions();
            }

            if(options.button_text){
                path_selector.find('form').submit(function(e){
                    e.preventDefault();
                    if(!options.inline) {
                        path_selector.hide();
                    }
                    $(document).trigger(options.button_event, [get_selected()]);
                });
            }

            if(!options.inline){
                path_selector.addClass("hover_selector");

                path_selector.hide();
                div.hoverIntent({
                            over:function(){ path_selector.show(); },
                            timeout:500,
                            interval: 200,
                            out:function(){ path_selector.hide(); }
                        });
            }
            scroll_obj = KT.env_select_scroll({});
            recalc_scroll();
            reposition_left();
        }