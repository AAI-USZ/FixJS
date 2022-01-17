function changeListener() {
        var loc = getLocation();

        if ( !loc ) {
            redirect( '' );
        } else if ( loc !== currentLocation ) {
            updateLocation( loc );
            doRoute( loc );
        }
    }