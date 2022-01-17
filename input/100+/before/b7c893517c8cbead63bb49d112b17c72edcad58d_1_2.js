function(){
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
        }