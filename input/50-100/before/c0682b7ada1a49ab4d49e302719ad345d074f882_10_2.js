function showErrorDialog( message, callback ){
      var dialog = new IFrameDialog({
        type: "iframe",
        modal: true,
        url: butter.ui.dialogDir + "error-message.html",
        events: {
          open: function( e ){
            dialog.send( "message", message );
          },
          cancel: function( e ){
            dialog.close();
            if( callback ){
              callback();
            }
          }
        }
      });
      dialog.open();
    }