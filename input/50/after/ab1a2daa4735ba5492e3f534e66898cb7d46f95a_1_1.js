function( butter ){

        butterLifeCycle.rememberButter( butter );
        butter.preparePopcornScriptsAndCallbacks(function(){
          succeeded = true;
          ok( true, "Ready called without any scripts/callbacks." );

          start();
        });
      }