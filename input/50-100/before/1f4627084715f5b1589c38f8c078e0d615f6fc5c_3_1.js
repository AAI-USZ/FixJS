function(passageId, version, fireChange) {
        if (version) {
            $(".passageVersion", step.util.getPassageContainer(passageId)).val(version);
        }
        return step.state._storeAndRetrieveCookieState(passageId, "version", version, fireChange);
    }