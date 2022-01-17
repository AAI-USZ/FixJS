function editorOpened( e ){
        if( butter.ui.contentState !== "editor" ){
          butter.ui.pushContentState( "editor" );
        }
      }