function( e ){
        var dialog = Dialog.spawn( "track-data", {
          data: track,
          events: {
            submit: function( e ) {
              // wrap in a try catch so we know right away about any malformed JSON
              try {
                var trackData = JSON.parse( e.data ),
                    trackEvents = track.trackEvents,
                    trackDataEvents = trackData.trackEvents,
                    dontRemove = {},
                    toAdd = [],
                    i,
                    l;

                trackDiv.childNodes[ 0 ].textContent = track.name = trackData.name;
                // update every trackevent with it's new data
                for ( i = 0, l = trackDataEvents.length; i < l; i++ ) {
                  var teData = trackDataEvents[ i ],
                      te = track.getTrackEventById( teData.id );

                  // check to see if the current track event exists already
                  if ( te ) {
                    te.update( teData.popcornOptions );
                    /* remove it from our reference to the array of track events so we know
                     * which ones to remove later
                     */
                    dontRemove[ teData.id ] = teData;
                  // if we couldn't find the track event, it must be a new one
                  } else {
                    toAdd.push( { type: teData.type, popcornOptions: teData.popcornOptions } );
                  }
                }

                // remove all trackEvents that wern't updated
                for ( i = trackEvents.length, l = 0; i >= l; i-- ) {
                  if ( trackEvents[ i ] && !dontRemove[ trackEvents[ i ].id ] ) {
                    track.removeTrackEvent( trackEvents[ i ] );
                  }
                }

                // add all the trackEvents that didn't exist so far
                for ( i = 0, l = toAdd.length; i < l; i++ ) {
                  track.addTrackEvent( toAdd[ i ] );
                }
                // let the dialog know things went well
                dialog.send( "track-updated" );
              } catch ( error ) {
                // inform the dialog about the issue
                dialog.send( "error" );
              }
            }
          }
        });
        dialog.open();
      }