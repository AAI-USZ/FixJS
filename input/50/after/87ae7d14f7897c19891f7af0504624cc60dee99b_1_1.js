function ()
                    {
                        /// Calculate the proper location for the drop down menu.
                        ///NOTE: Because the callout itself can have a scroll bar, we must calculate the actual position on the viewport and then add in the scroll position of the entire scroll (window.pageYOffset).
                        ///NOTE: Because the white-space CSS style is set to "nowrap", the element will not separate; therefore, there will only be one rectangle.
                        var el_pos = el.getClientRects()[0];
                    }