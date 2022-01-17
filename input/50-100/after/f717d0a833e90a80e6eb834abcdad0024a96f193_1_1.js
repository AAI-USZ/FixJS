function show_context_menu(pos, menu_items, selected, open_callback, close_callback)
            {
                /// If it is already open, close it and then re-open it with the new menu.
                ///TODO: Determine if this can (or should) ever happen.
                if (is_open) {
                    close_menu(function ()
                    {
                        if (typeof close_callback === "function") {
                            close_callback();
                        }
                        open_menu(pos, menu_items, selected, open_callback, close_callback);
                    });
                } else {
                    open_menu(pos, menu_items, selected, open_callback, close_callback);
                }
            }