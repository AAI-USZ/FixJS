function() {

    if ( popcorn.media.readyState !== 4 ) {

      setTimeout( readyStatePoll, 10 );
    } else {

      equal( popcorn.media.children[ 0 ].width, "100%",
        "Youtube player default width is 560" );
      equal( popcorn.media.children[ 0 ].height, "100%",
        "Youtube player default height is 315" );
      popcorn.destroy();
      start();
    }
  }