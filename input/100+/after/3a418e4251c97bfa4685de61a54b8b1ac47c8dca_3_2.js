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
        var dialog = Dialog.spawn( "save-as", {
          events: {
            submit: function( e ){
              butter.project.name = e.data;
              dialog.close();
              execute();
            }
          }
        });
        dialog.open();
      }
      else{
        execute();
      }
    }