function( resolved_tl_class, MetaDataStore ) {
        var trackMeta =  new MetaDataStore(
            dojo.mixin( this.config.trackMetadata || {}, {
                            trackConfigs: this.config.tracks,
                            browser: this,
                            metadataStores: dojo.map(
                                (this.config.trackMetadata||{}).sources || [],
                                function( sourceDef ) {
                                    var url  = sourceDef.url || 'trackMeta.csv';
                                    var type = sourceDef.type || (
                                            /\.csv$/i.test(url)     ? 'csv'  :
                                            /\.js(on)?$/i.test(url) ? 'json' :
                                            'csv'
                                    );
                                    var storeClass = sourceDef['class']
                                        || { csv: 'dojox/data/CsvStore', json: 'dojox/data/JsonRestStore' }[type];
                                    if( !storeClass ) {
                                        console.error( "No store class found for type '"
                                                       +type+"', cannot load track metadata from URL "+url);
                                        return null;
                                    }
                                    var store;
                                    require([storeClass],function(storeClass) {
                                        store = new storeClass({url: url});
                                    });
                                    return store;
                                },this)
                        })
        );


        // instantiate the tracklist and the track metadata object
        this.trackListView = new resolved_tl_class(
            dojo.mixin(
                dojo.clone( this.config.trackSelector ) || {},
                {
                    trackConfigs: this.config.tracks,
                    browser: this,
                    trackMetaData: trackMeta
                }
            )
        );

        // bind the 't' key as a global keyboard shortcut
        this.setGlobalKeyboardShortcut( 't', this.trackListView, 'toggle' );

        // listen for track-visibility-changing messages from views
        this.subscribe( '/jbrowse/v1/v/tracks/hide', this, 'onVisibleTracksChanged' );
        this.subscribe( '/jbrowse/v1/v/tracks/show', this, 'onVisibleTracksChanged' );

        // figure out what initial track list we will use:
        //    from a param passed to our instance, or from a cookie, or
        //    the passed defaults, or the last-resort default of "DNA"?
        var origTracklist =
               this.config.forceTracks
            || this.cookie( "tracks" )
            || this.config.defaultTracks
            || "DNA";

        this.showTracks( origTracklist );

        callback();
    }