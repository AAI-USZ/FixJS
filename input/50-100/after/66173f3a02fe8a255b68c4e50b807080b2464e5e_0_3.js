function(callback) {
            var me = this;
            if (me.__dsLoaded) {
                // run now
                callback(me);
            } else {
                if (!me.__datasetLoadedCallbacks) me.__datasetLoadedCallbacks = [];
                me.__datasetLoadedCallbacks.push(callback);
            }
        }