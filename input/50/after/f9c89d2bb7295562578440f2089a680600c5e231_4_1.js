function(){
          // icon preloading needs css to be loaded first
          _this.loadIcons( _uiConfig.value( "icons" ), _uiConfig.value( "dirs" ).resources || "" );
          onReady();
        }