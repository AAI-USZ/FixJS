function( onReady ){
      if( uiConfig.value( "ui" ).enabled !== false ){
        butter.loader.load(
          [
            {
              type: "css",
              url: BUTTER_CSS_FILE
            }
          ],
          function(){
            // icon preloading needs css to be loaded first
            loadIcons( uiConfig.value( "icons" ), uiConfig.value( "dirs" ).resources || "" );
            onReady();
          }
        );
      }
      else{
        onReady();
      }
    }