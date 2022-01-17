function ()
                        {
                            var i;
                            
                            /// In case the data is still loading, try to abort the request.
                            ajax.abort();
                            
                            for (i = destory_funcs.length - 1; i >= 0; i -= 1) {
                                destory_funcs[i]();
                            }
                            
                            document.body.removeChild(callout);
                        }