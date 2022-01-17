function( e ) {
      butter.unlisten( "trackeventremoved" );

      equal( e.data.id, te.id, "Removed correct track event" );
      start();
    }