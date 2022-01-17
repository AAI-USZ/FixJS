function() {
      // change our indicators of state
      if (window.hugrid.state == 'on') {
        window.hugrid.state = 'off' ;
      }
      else if( window.hugrid.state == 'off'){
        window.hugrid.state = 'on' ;
      }
    }