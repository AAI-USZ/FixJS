function(div_id, name, environments, options_in){

    var div,
        scroll_obj,
        paths_id,
        path_selector,
        options = {},
        utils = KT.utils,
        init = function(){
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
        },
        reposition_left = function(){
            var selector_width, pos;

            if(options.inline){
                return false;
            }
            selector_width = path_selector.outerWidth()  ;
            pos = div.outerWidth()  - selector_width;

            path_selector.css('left', pos + 'px');
        },
        reposition_right = function(){
            var margin = 10,
                window_width, selector_width, button_start, pos, top;

            if(options.inline){
                return false;
            }
            window_width = $(window).width();
            selector_width = path_selector.outerWidth()  ;
            button_start = div.offset().left;



            if(button_start + selector_width + margin > window_width){
                pos = window_width - (selector_width + margin);
                pos = pos - button_start;
            }
            else{
                pos = 0;
            }
            path_selector.css('left', pos + 'px');
        },
        default_opt = function(attribute, default_value){
            return attribute === undefined ? default_value : attribute;
        },
        setup_input_actions = function(){
            var anchors = path_selector.find('li'),
                nodes = path_selector.find('.node_select'),
                first_nodes = path_selector.find('ul').find('li:first'),
                on_select, on_deselect;

            anchors.hover(
                function(){
                    var input = $(this).find('.node_select');
                    if (!input.is(':visible')){
                        input.show();
                    }
                },
                function(){
                    var input = $(this).find('.node_select');
                        if(!input.is(":checked")){
                           input.hide();
                        }
                }
            );


            on_select = function(select_elem){
                select_nodes(select_elem);
                if(options.select_mode === 'single'){
                    nodes.attr('disabled', 'disabled');
                    select_elem.removeAttr('disabled');
                }
                if(options.link_first && select_elem.parents('li').is(':first-child')){
                    select_nodes(first_nodes.find('input:checkbox').not(':checked'))
                }
            };
            on_deselect = function(select_elem){
                unselect_nodes(select_elem);
                if(options.select_mode === 'single'){
                    nodes.removeAttr('disabled');
                }
                if(options.link_first && select_elem.parents('li').is(':first-child')){
                    unselect_nodes(first_nodes.find('input:checkbox:checked').hide());
                }
            };
            nodes.change(function(){
                    if ($(this).is(':checked')){
                        on_select($(this));
                    }
                    else {
                        on_deselect($(this));
                    }
            });

        },
        select_nodes = function(checkbox_list){
            checkbox_list.attr('checked', 'checked').show();
            checkbox_list.parents('label').addClass('active');
        },
        unselect_nodes = function(checkbox_list){
            checkbox_list.removeAttr('checked');
            checkbox_list.parents('label').removeClass('active');
        },
        get_selected = function(){
            var selected = path_selector.find('input:checked'),
                to_ret = {};

            KT.utils.each(selected, function(item){
                item = $(item);
                to_ret[item.data('node_id')] = { 'id' : item.data('node_id'), name:item.data('node_name'),
                            next_id:item.data('next_node_id')};
            });
            return to_ret;
        },
        get_paths = function(){
            return utils.flatten(environments);
        },
        recalc_scroll = function(){
           if(!options.expand){
               return false;
           }
           if(!options.inline){
               path_selector.show();
               scroll_obj.bind('#' + KT.common.escapeId(paths_id));
               path_selector.hide();
           }
           else {
               scroll_obj.bind('#' + KT.common.escapeId(paths_id));
           }
        },
        get_event = function(){
            return options.button_event;
        },
        clear_selected = function(){
            unselect_nodes(path_selector.find('input:checked').hide());
        },
        select = function(id, next_id){
           var nodes = path_selector.find('input:checkbox[data-node_id=' + id + ']');
           if(nodes.length > 1 && !options.link_first){
               nodes.and('[data-next_node_id=' + next_id + ']').not(':checked').click();
           }
           else{
               nodes.first().not(':checked').click();
           }
        };

    init();

    return {
        get_paths   : get_paths,
        get_selected: get_selected,
        get_event : get_event,
        clear_selected: clear_selected,
        select:select,
        reposition: reposition_left
    };
}