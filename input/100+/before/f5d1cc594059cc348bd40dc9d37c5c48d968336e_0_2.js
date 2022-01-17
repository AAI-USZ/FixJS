function(){
    var popcornTextPlugin = document.createElement( "script" );
    popcornTextPlugin.src = "../external/popcorn-js/plugins/text/popcorn.text.js";
    document.body.appendChild( popcornTextPlugin );

    var videoDiv = document.createElement( "video" );
    videoDiv.id = "media-target-test-div";
    videoDiv.setAttribute( "data-butter", "media" );
    videoDiv.setAttribute( "src", "../external/popcorn-js/test/trailer.ogv" );
    document.body.appendChild( videoDiv );

    createButter( function( butter ) {
      butter.config.value( "scrapePage", true );
      butter.preparePage(function(){
        var media = butter.media[0];

        media.listen( "mediaready", function(){
          var trackEvent = media.addTrack().addTrackEvent({
                type: "text",
                popcornOptions: {
                  start: 1,
                  end: 2,
                  text: "LOL",
                  target: "media-target-test-div"
                }
              });
          media.currentTime = 1.5;
          var contentDiv = document.getElementById( "media-target-test-div-overlay" );
          ok( contentDiv, contentDiv.innerHTML === "LOL", "Media has target div with correct content." );
          document.body.removeChild( videoDiv );
          start();
        });
      });
      //
    });

  }