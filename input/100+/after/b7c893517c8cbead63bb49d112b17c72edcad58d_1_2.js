function(){
            var selector_width, pos;

            if(options.inline){
                return false;
            }
            selector_width = path_selector.outerWidth()  ;
            pos = div.outerWidth()  - selector_width;

            path_selector.css('left', pos + 'px');
        }