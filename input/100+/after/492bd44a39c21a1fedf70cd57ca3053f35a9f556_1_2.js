function( butter ) {
    var t = butter.tracks[ 0 ],
        numTrackEvents = t.trackEvents.length;

    butter.listen( "trackeventadded", function( e ) {
      var popcornOptions = e.data.popcornOptions;

      butter.unlisten( "trackeventadded" );
      equal( ++numTrackEvents, t.trackEvents.length, "Total number of track events increased" );
      equal( e.data.type, defaultEvent.type, "Correct trackevent type of text" );
      equal( popcornOptions.start, defaultEvent.popcornOptions.start, "Correct start time of 2" );
      equal( popcornOptions.end, defaultEvent.popcornOptions.end, "Correct end time of 5" );
      equal( popcornOptions.text, defaultEvent.popcornOptions.text, "Correct text of '" + defaultEvent.popcornOptions.text + "'" );
      start();
    });

    t.addTrackEvent( defaultEvent );
  }