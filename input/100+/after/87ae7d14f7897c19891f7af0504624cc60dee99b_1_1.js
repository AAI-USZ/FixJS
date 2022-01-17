function ()
                {
                    var pos = get_pos(),
                        window_bottom = window.pageYOffset + window.innerHeight,
                        ///NOTE: A small amount of buffer room (about 22 pixels) seems to be necessary to place the menu properly aligned on the right edge.
                        window_right  = window.innerWidth - 22;
                    
                    /// If there is a problem with getting the position, just stop, don't throw an error that will kill the rest of the code.
                    ///NOTE: Because this is called via a event trigger, a critical error here could cause devastating effects elsewhere.
                    if (pos === undefined) {
                        return;
                    }
                    
                    ///NOTE: The position attribute must be set first because it effects the way offsetWidth is measured.
                    context_menu.style.position = (pos.absolute ? "absolute" : "fixed");
                    
                    pos.width = context_menu.offsetWidth;
                    
                    /// Prevent the menu from going too far right.
                    if (pos.x + pos.width > window_right) {
                        pos.x = window_right - pos.width;
                    }
                    /// Prevent the menu from going to far left.
                    ///NOTE: Since the code above could move the menu too far left, this much be checked for second.
                    if (pos.x < 0) {
                        pos.x = 0;
                    }
                    
                    pos.bottom = pos.y + context_menu.offsetHeight;
                    
                    /// Prevent the menu from going off the bottom of the page (unless the menu is far enough below the fold).
                    ///NOTE: If both the top and bottom of the menu would not be visible, then ignore it because the user apparently scroll away from the menu; therefore, we do not need to bring it back into view.
                    if (pos.bottom > window_bottom && pos.y < window_bottom + 20) {
                        pos.y = window_bottom - context_menu.offsetHeight;
                    }
                    
                    /// Prevent the menu from going off the top of the page (unless the menu is far enough above).
                    ///NOTE: If both the top and bottom of the menu would not be visible, then ignore it because the user apparently scroll away from the menu; therefore, we do not need to bring it back into view.
                    if (pos.y < window.pageYOffset && pos.bottom > window.pageYOffset) {
                        pos.y = window.pageYOffset;
                    }
                    
                    context_menu.style.left = pos.x + "px";
                    context_menu.style.top  = pos.y + "px";
                }