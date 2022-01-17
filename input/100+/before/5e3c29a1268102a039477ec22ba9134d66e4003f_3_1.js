function( args ) {

        // make the track list DOM nodes and widgets
        this.createTrackList( args.browser.container );

        // populate our track list (in the right order)
        this.trackListWidget.insertNodes(
            false,
            args.trackConfigs
        );

        // subscribe to drop events for tracks being DND'ed
        dojo.subscribe( "/dnd/drop",
                        this,
                        function( source, nodes, copy, target ){
                            if( target !== this.trackListWidget )
                                return;

                            // get the configs from the tracks being dragged in
                            var confs = dojo.filter(
                                dojo.map( nodes, function(n) {
                                              return n.track && n.track.config;
                                          }
                                        ),
                                function(c) {return c;}
                            );

                            // return if no confs; whatever was
                            // dragged here probably wasn't a
                            // track
                            if( ! confs.length )
                                return;

                            this.dndDrop = true;
                            dojo.publish( '/jbrowse/v1/v/tracks/hide', [confs] );
                            this.dndDrop = false;
                        }
                      );

        // subscribe to commands coming from the the controller
        dojo.subscribe( '/jbrowse/v1/c/tracks/show',
                        dojo.hitch( this, 'setTracksActive' ));
            // subscribe to commands coming from the the controller
        dojo.subscribe( '/jbrowse/v1/c/tracks/hide',
                        dojo.hitch( this, 'setTracksInactive' ));
    }