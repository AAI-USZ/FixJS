function( onReady ){
      if( _uiConfig.value( "ui" ).enabled !== false ){
        var loadOptions = {};

        // Determine if we should load a pre-built CSS file for Butter (e.g.,
        // the deployment case, post `node make`), or whether we need to load
        // the LESS file directly and parse it into CSS (e.g., the dev case).
        if( _uiConfig.value( "cssRenderClientSide" ) === true ){
          loadOptions.type = "less";
          loadOptions.url = BUTTER_LESS_FILE;
        } else {
          loadOptions.type = "css";
          loadOptions.url = BUTTER_CSS_FILE;
        }

        butter.loader.load( [ loadOptions ], function(){
          // icon preloading needs css to be loaded first
          loadIcons( _uiConfig.value( "icons" ), _uiConfig.value( "dirs" ).resources || "" );
          onReady();
        });
      }
      else{
        onReady();
      }
    }