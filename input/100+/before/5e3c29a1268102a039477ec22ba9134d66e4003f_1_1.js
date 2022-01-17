function( source, nodes, copy, target ) {
        this.updateTrackList();
        if( target.node === this.trackContainer ) {
            // if dragging into the trackcontainer, we are showing some tracks
            // get the configs from the tracks being dragged in
            var confs = dojo.filter( dojo.map( nodes, function(n) {
                                         return n.track && n.track.config;
                                     }),
                                     function(c) {return c;}
                                   );
            this.browser.publish( '/jbrowse/v1/v/tracks/show', [confs] );
        }
    }