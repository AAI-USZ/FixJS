function( spaceURL ) {
    if( typeof( spaceURL ) == "string") {
      var spaceFetch = new enyo.Ajax( { url: spaceURL } );
      this.state = "spaceFetch";

      spaceFetch.response( this, "spaceFetched"      );
      spaceFetch.error(    this, "spaceFetchFailure" );
      spaceFetch.go();
    }
  }