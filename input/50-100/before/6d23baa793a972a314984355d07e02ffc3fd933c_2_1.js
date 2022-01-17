function openEditor( trackEvent ) {
        if( _currentEditor ) {
          _currentEditor.close();
        }
        _currentEditor = Editor.create( "default", butter );
        _currentEditor.open( butter.ui.areas.editor.element, trackEvent );
        return _currentEditor;
      }