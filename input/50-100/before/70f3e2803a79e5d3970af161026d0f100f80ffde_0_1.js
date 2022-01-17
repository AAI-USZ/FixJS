function( set ) {

    // selector as is
    deepEqual( Popcorn.dom.find( set.selector ), fixture, set.desc + ", selector as-is" );

    // selector with leading whitespace
    deepEqual( Popcorn.dom.find( "  " + set.selector ), fixture, set.desc + ", selector w/ leading whitespace" );

    // selector with trailing whitespace
    deepEqual( Popcorn.dom.find( set.selector + "  " ), fixture, set.desc + ", selector w/ trailing whitespace" );

  }