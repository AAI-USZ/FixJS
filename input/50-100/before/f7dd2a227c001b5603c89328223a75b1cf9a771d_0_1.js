function( event ){
              // Get Popcorn instance and options instance
              var p = popcornInstances[ event.data.popcornID ],
                  options = p.getTrackEvent( event.data.optionsID );

              // Build Audio element and put on options object.
              handleWav( options, event.data.data );
            }