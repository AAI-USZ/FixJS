function() {
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
        }