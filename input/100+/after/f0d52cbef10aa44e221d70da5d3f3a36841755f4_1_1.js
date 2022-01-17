function() {

    var expects = 2,
        count = 0;

    function plus() {
      if ( ++count === expects ) {
        start();
      }
    }

    expect( expects );

    stop();

    var testObj = {
          "data": {
             "lang": "en",
             "length": 25
          }
        };

    Popcorn.xhr({

      url: "data/jsonp.php?callback=jsonp",
      dataType: "jsonp",
      success: function( data ) {

        ok( data, "getJSONP returns data" );
        plus();

        ok( QUnit.equiv(data, testObj) , "Popcorn.xhr({}) data.json returns an object of data" );
        plus();
      }
    });
  }