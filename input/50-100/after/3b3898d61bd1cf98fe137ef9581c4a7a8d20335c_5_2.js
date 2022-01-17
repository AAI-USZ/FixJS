function showErrorDialog( message, callback ){
      var dialog =Dialog.spawn( "error-message", {
        data: message,
        events: {
          cancel: function( e ){
            dialog.close();
            if( callback ){
              callback();
            }
          }
        }
      });
    }