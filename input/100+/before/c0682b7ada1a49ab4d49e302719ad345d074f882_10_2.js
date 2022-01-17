function doSave( callback ){

      function execute(){
        butter.project.html = butter.getHTML();
        butter.project.data = butter.exportProject();
        var saveString = JSON.stringify( butter.project, null, 4 );
        butter.ui.loadIndicator.start();
        butter.cornfield.save( butter.project.id, saveString, function( e ){
          butter.ui.loadIndicator.stop();
          if( e.error !== "okay" || !e.project || !e.project._id ){
            showErrorDialog( "There was a problem saving your project. Please try again." );
            return;
          }
          butter.project.id = e.project._id;
          if( callback ){
            callback();
          }
        });
      }

      if( !butter.project.name ){
        var dialog = new IFrameDialog({
          type: "iframe",
          modal: true,
          classes: "fade-in smallIframe",
          url: butter.ui.dialogDir + "save-as.html",
          events: {
            open: function( e ){
              dialog.send( "name", null );
            },
            submit: function( e ){
              butter.project.name = e.data;
              dialog.close();
              execute();
            },
            cancel: function( e ){
              dialog.close();
            }
          }
        });
        dialog.open();
      }
      else{
        execute();
      }
    }