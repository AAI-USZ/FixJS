function( e ){
        var dialog = Dialog.spawn( "delete-track", {
          data: trackName,
          events: {
            submit: function( e ){
              if( e.data === true ){
                media.removeTrack( track );
              } //if
              dialog.close();
            },
            cancel: function( e ){
              dialog.close();
            }
          }
        });
      }