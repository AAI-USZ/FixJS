function(){

        var popcornTextPlugin = document.createElement( "script" );
        popcornTextPlugin.src = "../external/popcorn-js/plugins/text/popcorn.text.js";
        document.head.appendChild( popcornTextPlugin );

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
          console.log( contentDiv.childNodes[0].innerHTML );
          ok( contentDiv.childNodes[0].innerHTML === "LOL", "Media has target div with correct content." );
          document.body.removeChild( videoDiv );
          document.head.removeChild( popcornTextPlugin );
          start();
        }