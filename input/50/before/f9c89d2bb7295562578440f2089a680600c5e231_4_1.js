function(){
          // icon preloading needs css to be loaded first
          loadIcons( _uiConfig.value( "icons" ), _uiConfig.value( "dirs" ).resources || "" );
          onReady();
        }