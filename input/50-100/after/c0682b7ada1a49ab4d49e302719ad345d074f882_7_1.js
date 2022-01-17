function editorClosed( e ){
        if( butter.ui.contentState === "editor" ){
          butter.ui.popContentState( "editor" );
        }
        _openEditor.unlisten( "close", editorClosed );
        _openEditor = null;
      }