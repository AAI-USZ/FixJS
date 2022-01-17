function(args) {
       this.browser = args.browser;
       this.tracksActive = {};
       this.config = args;

       // construct the discriminator for whether we will display a
       // facet selector for this facet
       this._isSelectableFacet = this._coerceFilter(
               args.selectableFacetFilter
               // default facet filtering function
               || function( facetName, store ){
                   return (
                       // has an avg bucket size > 1
                       store.getFacetStats( facetName ).avgBucketSize > 1
                    &&
                       // and not an ident or label attribute
                       ! dojo.some( store.getLabelAttributes()
                                    .concat( store.getIdentityAttributes() ),
                                    function(l) {return l == facetName;}
                                  )
                   );
               }
           );

       // construct a similar discriminator for which columns will be displayed
       this.displayColumns = args.displayColumns;
       this._isDisplayableColumn = this._coerceFilter(
           args.displayColumnFilter || function() { return true; }
       );

       // data store that fetches and filters our track metadata
       this.trackDataStore = args.trackMetaData;

       // subscribe to commands coming from the the controller
       this.browser.subscribe( '/jbrowse/v1/c/tracks/show',
                       dojo.hitch( this, 'setTracksActive' ));
       // subscribe to commands coming from the the controller
       this.browser.subscribe( '/jbrowse/v1/c/tracks/hide',
                       dojo.hitch( this, 'setTracksInactive' ));

       this.renderInitial();

       // once its data is loaded and ready
       this.trackDataStore.onReady( this, function() {

           // render our controls and so forth
           this.renderSelectors();

           // connect events so that when a grid row is selected or
           // deselected (with the checkbox), publish a message
           // indicating that the user wants that track turned on or
           // off
           dojo.connect( this.dataGrid.selection, 'onSelected', this, function(index) {
                         this._ifNotSuppressed( 'selectionEvents', function() {
                             this._suppress( 'gridUpdate', function() {
                                 this.browser.publish( '/jbrowse/v1/v/tracks/show', [this.dataGrid.getItem( index ).conf] );
                             });
                         });

           });
           dojo.connect( this.dataGrid.selection, 'onDeselected', this, function(index) {
                         this._ifNotSuppressed( 'selectionEvents', function() {
                             this._suppress( 'gridUpdate', function() {
                                 this.browser.publish( '/jbrowse/v1/v/tracks/hide', [this.dataGrid.getItem( index ).conf] );
                             });
                         });
           });
       });
       this.trackDataStore.onReady( this, '_updateFacetCounts' ); // just once at start

       dojo.connect( this.trackDataStore, 'onFetchSuccess', this, '_updateGridSelections' );
       dojo.connect( this.trackDataStore, 'onFetchSuccess', this, '_updateMatchCount' );
    }