function(passageId, reference, fireChange) {
        //if we've called this, then change the active state
        step.state.activeSearch(passageId, 'SEARCH_PASSAGE');
        
        // if we're in sync mode and passageId != 0, then we don't
        // accept any changes, we return reference of passage 0
        if (passageId != 0 && this.syncMode()) {
            if (reference) {
                // ignore if reference passed in + do not fire state changes
                return;
            }

            // if we're asked for a value, return that of passageId=0
            return step.state._storeAndRetrieveCookieState(0, "reference", reference, fireChange);
        }

        // store reference
        var ref = this._storedReference(passageId, reference, fireChange);

        if (this.syncMode() && reference) {
            // we need to alert all passages if reference has changed
            step.state._fireStateChangedAllButFirst();
        }

        return ref;
    }