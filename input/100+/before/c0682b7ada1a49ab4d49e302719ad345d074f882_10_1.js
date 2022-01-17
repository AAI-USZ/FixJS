function( e ){
          if( e.error !== "okay" ){
            showErrorDialog( "There was a problem saving your project. Please try again." );
            return;
          }
          else{
            var url = e.url;
            var dialog = new IFrameDialog({
              type: "iframe",
              modal: true,
              classes: "fade-in smallIframe",
              url: butter.ui.dialogDir + "share.html",
              events: {
                open: function( e ){
                  dialog.send( "url", url );
                },
                cancel: function( e ){
                  dialog.close();
                }
              }
            });
            dialog.open();
          }
        }