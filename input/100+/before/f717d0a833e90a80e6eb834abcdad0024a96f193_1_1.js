function create_callout(point_to, ajax, split_info) {
                    var callout = document.createElement("div"),
                        inside  = document.createElement("div"),
                        pointer = document.createElement("div"),
                        
                        callout_obj,
                        destory_funcs = [],
                        loading_timer,
                        pos = {};
                    
                    callout.className = "callout";
                    inside.className  = "inside";
                    
                    /// Prevent the page from scrolling when scrolling the content in the callout.
                    /// WebKit/Opera/IE9(?)
                    inside.addEventListener("mousewheel", function (e)
                    {
                        e.stopPropagation();
                    }, false);
                    /// Mozilla
                    inside.addEventListener("DOMMouseScroll", function (e)
                    {
                        e.stopPropagation();
                    }, false);
                    
                    callout.appendChild(inside);
                    callout.appendChild(pointer);
                    
                    /**
                     * Add a loading indicator if the content does not load very quickly.
                     *
                     * @note Delay the creation of the loading graphic because the data could load quickly enough as to make it unnecessary.
                     */
                    loading_timer = window.setTimeout(function ()
                    {
                        var loader = document.createElement("div");
                        
                        loader.style.opacity = "0";
                        loader.className = "loaders fade";
                        /// By default, loaders are invisible.
                        loader.style.visibility = "visible";
                        /// Center the graphic vertically.
                        loader.style.height = "100%";
                        inside.appendChild(loader);
                        /// Change the opacity after a delay to make it fade in (if the browser supports CSS transitions; otherwise the change is instant).
                        loading_timer = window.setTimeout(function () {
                            loader.style.opacity = ".99";
                        }, 0);
                    }, 500);
                    
                    /// Because non-pinned callouts are closed when the user clicks off,
                    /// we notify the document.onclick() function that a callout was clicked on so it will ignore the click.
                    callout.addEventListener("click", function ()
                    {
                        callout_clicked = true;
                    }, false);
                    
                    /// The element must be in the DOM tree in order for it to have a height and width.
                    document.body.appendChild(callout);
                    
                    callout_obj = {
                        /// Methods
                        /**
                         * Using outer variables, call the aligning function.
                         */
                        align_callout: function ()
                        {
                            align_callout(callout, pointer, point_to, pos, split_info);
                        },
                        /**
                         * Delete the callout and stop the query, if it has not already.
                         */
                        destroy: function ()
                        {
                            var i;
                            
                            /// In case the data is still loading, try to abort the request.
                            ajax.abort();
                            
                            for (i = destory_funcs.length - 1; i >= 0; i -= 1) {
                                destory_funcs[i]();
                            }
                            
                            document.body.removeChild(callout);
                        },
                        /**
                         * Move the callout up or down.
                         *
                         * @param y (number) The amount to move vertically.
                         */
                        move: function (y)
                        {
                            pos.top += y;
                            callout.style.top = pos.top + "px";
                        },
                        ondestroy: function (func)
                        {
                            if (typeof func === "function") {
                                destory_funcs[destory_funcs.length] = func;
                            }
                        },
                        /**
                         * Determine if the element that the callout is pointing to still exists.
                         *
                         * @return boolean
                         * @note   The element the callout is pointing to could be removed when verses are cached.
                         */
                        point_to_el_exists: function ()
                        {
                            ///NOTE: Right now, all words have unique id. If this is not true in the future,
                            ///      we could loop through .parentNode until reaching document or NULL.
                            return Boolean(document.getElementById(point_to.id));
                        },
                        /**
                         * Write HTML to the callout and prevent the loading notifier from loading, if it has not already appeared.
                         *
                         * @param html (string OR DOM element) The HTML or DOM element display in the callout.
                         */
                        replace_HTML: function (html)
                        {
                            /// Prevent the loading graphic from loading if it has not loaded yet.
                            window.clearTimeout(loading_timer);
                            if (typeof html === "string") {
                                inside.innerHTML = html;
                            } else {
                                inside.innerHTML = "";
                                inside.appendChild(html);
                            }
                        },
                        
                        /// Properties
                        just_created: true
                    };
                    
                    callout_obj.align_callout();
                    
                    /// Prevent the callout from being destroyed by the document.onclick function that will fire momentarily.
                    window.setTimeout(function ()
                    {
                        callout_obj.just_created = false;
                    }, 200);
                    
                    return callout_obj;
                }