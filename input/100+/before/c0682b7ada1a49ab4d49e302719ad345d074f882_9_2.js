function( e ){
        var dialog = new IFrameDialog({
          type: "iframe",
          modal: true,
          url: butter.ui.dialogDir + "delete-track.html",
          events: {
            open: function( e ){
              dialog.send( "trackdata", trackName );
            },
            submit: function( e ){
              if( e.data === true ){
                media.removeTrack( track );
              } //if
              dialog.close();
            },
            cancel: function( e ){
              dialog.close();
            },
            trackupdated: function( e ) {
              dialog.send( "trackupdated", { success: false });
            }
          }
        });
        dialog.trackupdated = function( e ) {
          console.log( "called", e );
        };
        dialog.open();
      }