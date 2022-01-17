function( e ){

      var exportPackage = {
        html: butter.getHTML(),
        json: butter.exportProject()
      };

      var dialog = new IFrameDialog({
        type: "iframe",
        modal: true,
        url: butter.ui.dialogDir + "view-source.html",
        events: {
          open: function(){
            dialog.send( "export", exportPackage );
          },
          cancel: function( e ){
            dialog.close();
          }
        }
      });

      dialog.open();
    }