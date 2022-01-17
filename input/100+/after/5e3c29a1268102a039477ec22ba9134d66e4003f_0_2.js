function( trackNames ) {
    if( !this.isInitialized ) {
        this.deferredFunctions.push( function() { this.showTracks(trackNames); } );
        return;
    }

    if( typeof trackNames == 'string' )
        trackNames = trackNames.split(',');

    if( ! trackNames )
        return;

    var trackConfs = dojo.filter(
        dojo.map( trackNames, function(n) {
                      return this.trackConfigsByName[n];
                  }, this),
        function(c) {return c;} // filter out confs that are missing
    );

    // publish some events with the tracks to instruct the views to show them.
    this.publish( '/jbrowse/v1/c/tracks/show', trackConfs );
    this.publish( '/jbrowse/v1/n/tracks/visibleChanged' );
}