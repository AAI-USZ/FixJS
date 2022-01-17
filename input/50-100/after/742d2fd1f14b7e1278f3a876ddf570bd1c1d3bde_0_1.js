function openEditor( trackEvent ) {
      // If the editor has never been used before, open it now
      if ( !_firstUse ) {
        _firstUse = true;
        _editorAreaDOMRoot.classList.remove( "minimized" );
      }

      var editorType = Editor.isRegistered( trackEvent.type ) ? trackEvent.type : "default";
      if( _currentEditor ) {
        _currentEditor.close();
      }
      _currentEditor = Editor.create( editorType, butter );
      _currentEditor.open( _editorAreaDOMRoot, trackEvent );
      return _currentEditor;
    }