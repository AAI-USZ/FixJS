function( e ){
          if( e.error !== "okay" ){
            showErrorDialog( "There was a problem saving your project. Please try again." );
            return;
          }
          else{
            var url = e.url;
            var dialog = Dialog.spawn( "share", {
              data: url
            });
          }
        }