function(){
      _this.loadIndicator.stop();
      _this.visible = true;
      _toggler.visible = true;
      ContextButton( butter );
      if( uiConfig.value( "ui" ).enabled !== false ){
        Header( butter, uiConfig );
      }
    }