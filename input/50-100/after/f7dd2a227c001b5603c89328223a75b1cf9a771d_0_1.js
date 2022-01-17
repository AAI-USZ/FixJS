function( event ){
              // Get Popcorn instance and options instance
              var p = popcornInstances[ event.data.popcornID ],
                  options = p.getTrackEvent( event.data.optionsID );

              // Bail if options object has vanished since this
              // request was originally made to build the speech.
              if( !options ){
                return;
              }

              // Build Audio element and put on options object.
              handleWav( options, event.data.data );
            }