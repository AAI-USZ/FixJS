function( onModuleReady ){
      onModuleReady();
      if( butter.config.value( "ui" ).enabled !== false ){
        _editorAreaDOMRoot = LangUtils.domFragment( EDITOR_AREA_LAYOUT );
        butter.ui.areas.editor = new butter.ui.Area( "editor-area", _editorAreaDOMRoot );
        var toggler = new Toggler( function( e ) {
          var newState = !_editorAreaDOMRoot.classList.contains( "minimized" );
          toggler.state = newState;
          if ( newState ) {
            _editorAreaDOMRoot.classList.add( "minimized" );
          }
          else {
            _editorAreaDOMRoot.classList.remove( "minimized" );
          }
        }, "Show/Hide Editor" );
        _editorAreaDOMRoot.appendChild( toggler.element );
        document.body.classList.add( "butter-editor-spacing" );

        // Start minimized
        _editorAreaDOMRoot.classList.add( "minimized" );

        document.body.appendChild( _editorAreaDOMRoot );

        Editor.baseDir = butter.config.value( "baseDir" );
        Butter.Editor = Editor;

        var config = butter.config.value( "editor" );
        for ( var editorName in config ) {
          if ( config.hasOwnProperty( editorName ) ) {
            butter.loader.load({
              url: config[ editorName ],
              type: "js"
            });
          }
        }
      }
    }