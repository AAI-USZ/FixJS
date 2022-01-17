function() {
                    me.__dataview = this;
                    me.__dsLoaded = true;
                    callback(this);
                    if (me.__datasetLoadedCallbacks) {
                        for (var i=0; i<me.__datasetLoadedCallbacks.length; i++) {
                            me.__datasetLoadedCallbacks[i](me);
                        }
                    }
                }