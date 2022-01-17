function() {

  expect( 6 );

  var popcorn1 = Popcorn.youtube( "#video4", "http://www.youtube.com/watch?v=nfGV32RNkhw" ),
      popcorn2 = Popcorn.youtube( "#video5", "http://www.youtube.com/watch?v=nfGV32RNkhw" ),
      popcorn3 = Popcorn.youtube( "#customHeight", "http://www.youtube.com/watch?v=nfGV32RNkhw" ),
      readyStatePoll = function() {

        if ( popcorn1.media.readyState !== 4 || popcorn2.media.readyState !== 4 || popcorn3.media.readyState !== 4 ) {

          setTimeout( readyStatePoll, 10 );
        } else {

          equal( popcorn1.media.children[ 0 ].width, 640, "Youtube player default width is 560" );
          equal( popcorn1.media.children[ 0 ].height, 390, "Youtube player default height is 315" );

          equal( popcorn2.media.children[ 0 ].getAttribute( "width" ), 640, "Youtube player min width is 640" );
          equal( popcorn2.media.children[ 0 ].getAttribute( "height" ), 390, "Youtube player min height is 390" );

          equal( popcorn3.media.children[ 0 ].width, 800, "Youtube correctly gets width style of container (800)" );
          equal( popcorn3.media.children[ 0 ].height, 450, "Youtube correctly gets height style of container (450)" );

          popcorn1.destroy();
          popcorn2.destroy();
          popcorn3.destroy();
          start();
        }
      };

  popcorn1.volume( 0 );
  popcorn2.volume( 0 );
  popcorn3.volume( 0 );

  readyStatePoll();
}