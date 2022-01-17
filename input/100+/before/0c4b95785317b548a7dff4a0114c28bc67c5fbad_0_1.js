function( inSender, inResponse ) {
    var fail = false;

    if( typeof(inResponse) == "object" ) {
      this.spaceStatuses[inSender.url] = inResponse;
      this.doSpaceFetched({url: inSender.url, response: inResponse});

      this.fetchedSpaceCount++;
    } else {
      enyo.log( "Failed to fetch " + inSender.url);

      var idx = this.directoryData.indexOf(inSender.url);
      this.directoryData.splice(idx, 1);
      this.spaceCount = this.size();

      this.doFetchError(inSender, inSender.url);
    }

    if( this.fetchedSpaceCount == this.spaceCount ) {
      this.state = "spacesFetched";
      this.doSpacesFetched();
    }
  }