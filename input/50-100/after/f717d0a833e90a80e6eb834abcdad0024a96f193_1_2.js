function ()
                        {
                            /// In case the data is still loading, try to abort the request.
                            ajax.abort();
                            
                            document.body.removeChild(callout);
                        }