function(callback) {
            var me = this;
            if (!me.__datasetLoadedCallbacks) me.__datasetLoadedCallbacks = [];
            me.__datasetLoadedCallbacks.push(callback);
        }