function editorClosed( e ){
        if( _openEditor.frame === "iframe" ){
          if( butter.ui.contentState === "editor" ){
            butter.ui.popContentState( "editor" );
          }
        }
        _openEditor.unlisten( "close", editorClosed );
        _openEditor = null;
      }