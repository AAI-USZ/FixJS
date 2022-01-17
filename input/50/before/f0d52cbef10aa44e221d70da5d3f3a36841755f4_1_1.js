function( data ) {

        ok( data, "getJSONP returns data" );
        plus();
        ok( QUnit.equiv( data, testObj ) , "Popcorn.xhr.getJSONP data.json returns an object of data" );
        plus();
      }