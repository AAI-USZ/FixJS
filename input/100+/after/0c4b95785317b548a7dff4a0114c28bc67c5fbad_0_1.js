function( inSender, inResponse ) {
    var fail = false;

    if( typeof(inResponse) == "object" ) {
      this.spaceStatuses[inSender.url] = inResponse;
      this.doSpaceFetched({url: inSender.url, response: inResponse});

      this.fetchedSpaceCount++;
      enyo.log( "Fetched " + inSender.url);
      enyo.log( this.size() );
    } else {
      this.spaceFetchFailed(inSender);
    }

    if( this.fetchedSpaceCount == this.spaceCount ) {
      this.state = "spacesFetched";
      this.doSpacesFetched();
    }
  }