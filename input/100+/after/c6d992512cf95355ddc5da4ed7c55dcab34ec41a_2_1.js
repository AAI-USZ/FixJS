function(syncMode, fireChange) {
        // always store syncMode against passage 0
        var mode;
        if (syncMode != null) {
            mode = step.state._storeAndRetrieveCookieState(0, "syncMode", syncMode, false);

            // state changed
            step.state._fireStateChangedAllButFirst();
        } else {
            // check we have something stored...
            mode = step.state._storeAndRetrieveCookieState(0, "syncMode");
            if (isEmpty(mode)) {
                mode = false;
                step.state._storeAndRetrieveCookieState(0, "syncMode", step.defaults.syncMode, false);
            }
            return mode == true || mode == "true";
        }
    }