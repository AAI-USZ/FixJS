function(){
      _this.loadIndicator.stop();
      _this.visible = true;
      _toggler.visible = true;
      ContextButton( butter );
      if( _uiConfig.value( "ui" ).enabled !== false ){
        Header( butter, _uiConfig );
      }
    }