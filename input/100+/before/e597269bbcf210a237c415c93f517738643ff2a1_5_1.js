function( onModuleReady ){
      onModuleReady();
      if( butter.config.value( "ui" ).enabled !== false ){
        var editorAreaDOMRoot = LangUtils.domFragment( EDITOR_AREA_LAYOUT );
        butter.ui.areas.editor = new butter.ui.Area( "editor-area", editorAreaDOMRoot );
        var toggler = new Toggler( function( e ) {
          var newState = !editorAreaDOMRoot.classList.contains( "minimized" );
          toggler.state = newState;
          if ( newState ) {
            editorAreaDOMRoot.classList.add( "minimized" );
          }
          else {
            editorAreaDOMRoot.classList.remove( "minimized" ); 
          }
        }, "Show/Hide Editor" );
        editorAreaDOMRoot.appendChild( toggler.element );
        document.body.classList.add( "butter-editor-spacing" );
        document.body.appendChild( editorAreaDOMRoot );
      }
    }