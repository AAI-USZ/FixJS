function() {

    if ( popcorn.media.readyState !== 4 ) {

      setTimeout( readyStatePoll, 10 );
    } else {

      equal( popcorn.media.children[ 0 ].width, "100%",
        "Youtube player width is 100%" );
      equal( popcorn.media.children[ 0 ].height, "100%",
        "Youtube player height is 100%" );
      popcorn.destroy();
      start();
    }
  }