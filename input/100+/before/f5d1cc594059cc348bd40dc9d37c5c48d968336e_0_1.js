function(){
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
        }