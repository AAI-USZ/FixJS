function( butter ){
        butterLifeCycle.rememberButter( butter );

        var mediaURLS = [ "http://www.youtube.com/watch?v=7glrZ4e4wYU",
            "http://vimeo.com/30619461",
            "../external/popcorn-js/test/italia.ogg" ],
            index = 0,
            count = 0;

        equals( butter.currentMedia, undefined, "Initially there is no media" );

        function mediaReady() {
          ok( true, "Media changed triggered" + mediaURLS[ index ] );
          equals( butter.currentMedia.url, mediaURLS[ index ], "The currentMedia's url is equal to the one that has been set" );

          if( mediaURLS[ index + 1 ] === undefined ) {
            butter.unlisten( "mediaready", mediaReady );
            start();
          }

          butter.currentMedia = butter.addMedia({ url: mediaURLS[ ++index ], target: "mediaDiv" });
        }

        butter.listen( "mediaready", mediaReady );
        butter.addMedia({ url: mediaURLS[ index ], target: "mediaDiv" });
      }