function( inSender, inResponse ) {
    var fail = false;

    if( typeof(inResponse) == "object" ) {
      this.spaceStatuses[inSender.url] = inResponse;
      this.doSpaceFetched({url: inSender.url, response: inResponse});
    } else {
      fail = true;
    }

    this.fetchedSpaceCount++;
    if( this.fetchedSpaceCount == this.spaceCount ) {
      this.state = "spacesFetched";
      this.doSpacesFetched();
    }

    if(fail) {
      inSender.fail(inResponse);
    }
  }