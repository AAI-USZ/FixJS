function(e){
                    e.preventDefault();
                    if(!options.inline) {
                        path_selector.hide();
                    }
                    $(document).trigger(options.button_event, get_selected());
                }