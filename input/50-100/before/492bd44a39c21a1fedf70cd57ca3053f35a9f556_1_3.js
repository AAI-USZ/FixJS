function( butter ) {
      var t = butter.tracks[ 0 ],
          te = t.addTrackEvent( defaultEvent );

      butter.listen( "trackeventremoved", function( e ) {
        butter.unlisten( "trackeventremoved" );

        equal( e.data.id, te.id, "Removed correct track event" );
        start();
      });

      t.removeTrackEvent( te );
    }