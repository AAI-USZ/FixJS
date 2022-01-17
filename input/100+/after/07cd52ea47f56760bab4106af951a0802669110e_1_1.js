function() {

    var expects = 10,
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

    Popcorn.xhr.getJSONP(

      "data/jsonp.php?callback=jsonp",
      function( data ) {

        ok( data, "getJSONP returns data" );
        plus();
        ok( QUnit.equiv(data, testObj) , "Popcorn.xhr.getJSONP data.json returns an object of data" );
        plus();
      }
    );

    Popcorn.xhr.getJSONP( "http://api.flickr.com/services/feeds/photos_public.gne?id=35034346917@N01&lang=en-us&format=json&jsoncallback=flickr",

      function( data ) {

        ok( data, "getJSONP returns flickr data" );
        plus();
        equal( typeof data, "object", "getJSONP returns flickr data" );
        plus();
      }
    );

    Popcorn.getJSONP(

      "data/jsonp.php?callback=jsonp",
      function( data ) {

        ok( data, "getJSONP returns data" );
        plus();
        ok( QUnit.equiv( data, testObj ) , "Popcorn.xhr.getJSONP data.json returns an object of data" );
        plus();
      }
    );

    Popcorn.getJSONP(

      "data/jsonp.php?nonsense=no?sense",
      function( data ) {

        ok( data, "getJSONP returns data" );
        plus();
        ok( QUnit.equiv( data, testObj ) , "Popcorn.xhr.getJSONP data.json returns an object of data" );
        plus();
      }
    );
  }