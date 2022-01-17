function( script ) {
      var win = this.getContentWindow();
      if( !win[ "eval" ] && win[ "execScript" ] ) {
        // Workaround for IE bug, see: http://www.thismuchiknow.co.uk/?p=25
        win.execScript( "null;", "JScript" );
      }
      return win[ "eval" ]( script );
    }