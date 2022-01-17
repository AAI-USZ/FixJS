function(passageId, version, fireChange) {
        if (version) {
            $(".passageVersion", step.util.getPassageContainer(passageId)).val(version);
            
        }
        var returnVersion = step.state._storeAndRetrieveCookieState(passageId, "version", version, fireChange);
        
        //now that we've updated, alert if we intended a change
        if(version) {
            $.shout("version-changed-" + passageId, version);
        }
        
        return returnVersion;
    }