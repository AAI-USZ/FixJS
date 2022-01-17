function() {
        if ( xhr.readyState === 4 ) {
          equal( xhr.responseText, js, "generatePopcornString generated expected Popcorn JS." );
          start();
          startTests();
        }
      }