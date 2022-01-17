function(){

    createButter( function( butter ){

      var m1 = butter.addMedia( { name: "Media 1", target: "audio-test", url: "../external/popcorn-js/test/trailer.ogv" } );
      ok( m1.name === "Media 1", "Name is correct" );
      ok( m1.target === "audio-test" && m1.url === "../external/popcorn-js/test/trailer.ogv", "Media storage is correct" );

      start();
    });
  }