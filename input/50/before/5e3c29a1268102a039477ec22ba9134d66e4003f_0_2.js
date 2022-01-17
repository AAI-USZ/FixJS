function( trackConfigs ) {
        this.addRecentlyUsedTracks( dojo.map(trackConfigs, function(c){ return c.label;}) );
        this.publish( '/jbrowse/v1/c/tracks/show', trackConfigs );
    }