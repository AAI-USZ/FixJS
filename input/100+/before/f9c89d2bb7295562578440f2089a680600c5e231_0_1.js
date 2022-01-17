function( onModuleReady ){
      onModuleReady();
      _toggler = new Toggler( function( e ) {
        var newState = !_editorAreaDOMRoot.classList.contains( "minimized" );
        _toggler.state = newState;
        if ( newState ) {
          _editorAreaDOMRoot.classList.add( "minimized" );
        }
        else {
          _editorAreaDOMRoot.classList.remove( "minimized" );
        }
      }, "Show/Hide Editor", true );

      var editorsToLoad = [];

      if( butter.config.value( "ui" ).enabled !== false ){
        butter.ui.areas.editor = new butter.ui.Area( "editor-area", _editorAreaDOMRoot );
        _editorAreaDOMRoot.appendChild( _toggler.element );
        document.body.classList.add( "butter-editor-spacing" );

        // Start minimized
        _editorAreaDOMRoot.classList.add( "minimized" );

        document.body.appendChild( _editorAreaDOMRoot );

        var config = butter.config.value( "editor" );
        for ( var editorName in config ) {
          if ( config.hasOwnProperty( editorName ) ) {
            editorsToLoad.push({
              url: config[ editorName ],
              type: "js"
            });
          }
        }

        if ( editorsToLoad.length > 0 ){
          butter.loader.load( editorsToLoad, function() {
            Editor.loadUrlSpecifiedLayouts( onModuleReady, butter.config.value( "baseDir" ) );
          });
        }
        else {
          onModuleReady();
        }

      }
      else {
        onModuleReady();
      }
    }