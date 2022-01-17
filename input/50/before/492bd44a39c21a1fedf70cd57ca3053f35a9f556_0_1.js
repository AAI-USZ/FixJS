function() {
        if ( xhr.readyState === 4 ) {
          equal( xhr.responseText, js, "getHTML generated expected html." );
          start();
          startTests();
        }
      }