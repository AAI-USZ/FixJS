function(passageId, version, fireChange) {
        if (version) {
            $(".passageVersion", step.util.getPassageContainer(passageId)).val(version);
            $.shout("version-changed-" + passageId, version);
        }
        return step.state._storeAndRetrieveCookieState(passageId, "version", version, fireChange);
    }