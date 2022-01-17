function openEditor( trackEvent ) {
        var editorType = Editor.isRegistered( trackEvent.type ) || "default";
        if( _currentEditor ) {
          _currentEditor.close();
        }
        _currentEditor = Editor.create( editorType, butter );
        _currentEditor.open( butter.ui.areas.editor.element, trackEvent );
        return _currentEditor;
      }