function(grid) {
    console.log(grid);
    var column_selector = (function() {
        var hide = function() {
                $('#column_selector').hide();
                $('.slide_arrow[data-arrow_direction="right"]').css({ right : '-1px' });
            },
            show = function() {
                $('#column_selector').show();
                $('.slide_arrow[data-arrow_direction="right"]').css({ right : '21px' });
            };

            return {
                show : show,
                hide : hide
            };

        }()),

        horizontal_scroll = (function() {
            var right_arrow = $('.slide_arrow[data-arrow_direction="right"]'),
                right_arrow_trigger = right_arrow.find('.slide_trigger'),
                left_arrow  = $('.slide_arrow[data-arrow_direction="left"]'),
                left_arrow_trigger = left_arrow.find('.slide_trigger'),
                arrow  = $('.slide_arrow'),
                arrow_trigger = arrow.find('.slide_trigger'),

                show = function() {
                    right_arrow.show();
                    left_arrow.show();
                },
                hide = function() {
                    right_arrow.hide();
                    left_arrow.hide();
                },
                current_position = function(){
                    return $('#column_headers').position().left;
                },
                stop_position = function(){
                    return -((grid.get_num_columns_shown() - grid.get_max_visible_columns()) * 100);
                },
                reset = function(){
                    var distance = $('#grid_content').css('left');

                    $('#grid_content').animate({ 'left' : 0 }, 'fast');
                    $('#column_headers').animate({ 'left' : 0 }, 'fast',
                        function() {
                            set_arrow_states();
                        }
                    );

                },
                set_arrow_states = function() {
                    if( current_position() === 0 ){
                        right_arrow.find('span').addClass('disabled');
                        left_arrow.find('span').removeClass('disabled');
                    } else if( stop_position() === current_position() ) {
                        left_arrow.find('span').addClass('disabled');
                        right_arrow.find('span').removeClass('disabled');
                    } else {
                        right_arrow.find('span').removeClass('disabled');
                        left_arrow.find('span').removeClass('disabled');
                    }
                },
                slide = function(direction) {
                    var position = (direction === 'left') ? '-=100' : '+=100';
                    
                    $('#grid_content').animate({ 'left' : position }, 'fast');
                    $('#column_headers').animate({ 'left' : position }, 'fast',
                        function() {
                            set_arrow_states();
                        }
                    );
                };
            
            arrow_trigger.click(
                function(){ 
                    var slide_arrow = $(this).parent(),
                        direction = slide_arrow.data('arrow_direction');
    
                    if( !slide_arrow.find('span').hasClass('disabled') ){
                        slide_arrow.find('span').addClass('disabled');

                        if( direction === "left" ){
                            if( stop_position() < current_position() && current_position() <= 0 ){
                                slide(direction);
                            }
                        } else if( direction === "right" ){
                            if( stop_position() <= current_position() && current_position() < 0 ){
                                slide(direction);
                            }
                        }
                    }
                }
            ).hover(
                function(){
                    if( !$(this).find('span').hasClass('disabled') ){
                        $(this).parent().addClass('slide_arrow_hover');
                    }
                },
                function(){ 
                    $(this).parent().removeClass('slide_arrow_hover');
                }
            );

            return {
                show    : show,
                hide    : hide,
                slide   : slide,
                reset   : reset
            }
        }()),

        change_content_select = (function(){
            var container = $('#change_content_select'),
                selector = container.find('select'),
                
                set = function(options, selected_id){
                    var html = "";

                    selector.empty();

                    KT.utils.each(options, function(option){ 
                        html += '<option value="' + option['id'] + '"' ;
                        if (option['id'] === selected_id){
                            html += "selected=selected";
                        }
                        html += '>' + option['name'] + '</option>';
                    });

                    selector.append(html);
                },
                show = function(){
                    container.show();
                },
                hide = function(){
                    container.hide();
                };

            return {
                set     : set,
                show    : show,
                hide    : hide
            };
        }()),
        comparison = (function(){
            var show = function(){
                    $('#compare_repos_btn').show();
            },
            hide = function(){
                $('#compare_repos_btn').hide();
            };
            return {
                show:show,
                hide:hide
            }
        }()),
        row_collapse = (function(){
            var init = function(grid) {
                    $('.row_header[data-collapsed]').live('click', function(){
                        if( $(this).data('collapsed') ){
                            expand($(this).data('id'), grid.models.rows);
                            $(this).data('collapsed', false);
                        } else {
                            collapse($(this).data('id'), grid.models.rows);
                            $(this).data('collapsed', true);
                        }
                    });
                },
                show = function(id, should_show, rows){
                    if( should_show ){
                        $('#child_list_' + id).show();
                        $('#child_header_list_' + id).show();
                    } else {
                        $('#child_list_' + id).hide();
                        $('#child_header_list_' + id).hide();
                    }
                },
                collapse = function(id, rows){
                    var parent_row_header = $('#row_header_' + KT.common.escapeId(id));

                    show(id, false, rows);

                    parent_row_header.find('.down_arrow-icon-black').hide()
                    parent_row_header.find('.right_arrow-icon-black').show();
                },
                expand = function(id, rows){
                    var parent_row_header = $('#row_header_' + KT.common.escapeId(id));

                    show(id, true, rows);

                    parent_row_header.find('.down_arrow-icon-black').show();
                    parent_row_header.find('.right_arrow-icon-black').hide();
                };

            return {
                init        : init,
                expand      : expand,
                collapse    : collapse
            };
        }()).init(grid);

    return {
        horizontal_scroll       : horizontal_scroll,
        column_selector         : column_selector,
        row_collapse            : row_collapse,
        change_content_select   : change_content_select,
        comparison              : comparison
    }
}