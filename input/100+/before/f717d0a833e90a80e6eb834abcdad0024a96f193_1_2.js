function (options, select, onchange, ondestroy)
            {
                var close_menu,
                    el = document.createElement("span"),
                    i,
                    is_open,
                    menu_items = [];
                
                /**
                 * Create the function that fires when a menu item is selected.
                 *
                 * @param  which (integer) The option that is selected.
                 * @return A function that triggers the onchange callback.
                 * @note   Since functions should not be created in loops, this function must be declared before the loop.
                 */
                function make_onclick(which)
                {
                    /**
                     * Trigger the onchange callback
                     *
                     * @param e (event object) The onclick mouse event.
                     */
                    return function (e)
                    {
                        /// Change the text in the drop down box.
                        el.textContent = options[which].display;
                        /// Remember which option was last chosen.
                        select = which;
                        /// Do not let this mouse event cascade and cause other events to fire (like closing a lexical callout).
                        e.stopPropagation();
                        
                        if (typeof onchange === "function") {
                            onchange(which);
                        }
                    };
                }
                
                /// Create the menu items to sent to show_context_menu().
                for (i = options.length - 1; i >= 0; i -= 1) {
                    menu_items[i] = {
                        id:    i,
                        html:  options[i].details,
                        title: options[i].title,
                        link:  make_onclick(i)
                    };
                }
                
                el.className = "dropdown";
                
                /// Display the default text (if it exists).
                el.textContent = options[select] ? options[select].display : options[0].display;
                
                /**
                 * Open the drop down menu
                 *
                 * @param  e (event object) The onclick mouse event.
                 * @return FALSE to prevent the default action.
                 * @todo   Determine if sending FALSE is necessary.
                 */
                el.onclick = function (e)
                {
                    close_menu = show_context_menu(function ()
                        {
                            /// Calculate the proper location for the drop down menu.
                            ///NOTE: Because the callout itself can have a scroll bar, we must calculate the actual position on the viewport and then add in the scroll position of the entire scroll (window.pageYOffset).
                            ///NOTE: Because the white-space CSS style is set to "nowrap", the element will not separate; therefore, there will only be one rectangle.
                            var el_pos = el.getClientRects()[0];
                            
                            /// Is the element still on the page; if not return undefined.
                            if (el_pos) {
                                return {x: el_pos.left, y: el_pos.bottom + window.pageYOffset, absolute: true};
                            }
                        }, menu_items, select, function onopen()
                        {
                            is_open = true;
                        }, function onclose()
                        {
                            is_open = false;
                        });
                    /// Prevent the event from trigger other events, like the callout onclick event.
                    e.stopPropagation();
                    e.preventDefault();
                    return false;
                };
                
                ondestroy(function ()
                {
                    if (is_open) {
                        close_menu();
                    }
                });
                
                return el;
            }