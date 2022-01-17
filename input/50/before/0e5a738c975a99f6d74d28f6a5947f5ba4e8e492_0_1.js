function changeListener() {
        var loc = getLocation();

        if ( !loc ) {
            redirect( '' );
        } else if ( loc !== currentLocation ) {
            doRoute( loc );
        }
    }