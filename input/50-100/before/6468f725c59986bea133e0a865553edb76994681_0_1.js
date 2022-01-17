function( onModuleReady ){
      onModuleReady();
      if( butter.config.value( "ui" ).enabled !== false ){
        var editorAreaDOMRoot = LangUtils.domFragment( EDITOR_AREA_LAYOUT );
        butter.ui.areas.editor = new butter.ui.Area( "editor-area", editorAreaDOMRoot );
        document.body.classList.add( "butter-editor-spacing" );
        document.body.appendChild( editorAreaDOMRoot );
      }
    }