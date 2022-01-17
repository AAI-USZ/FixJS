function( inSender, inResponse ) {
    this.state = "directoryFetched";
    this.directoryData = [];

    for( var idx in inResponse ) {
      this.directoryData.push(inResponse[idx]);
    }

    this.doDirectoryFetched( inResponse );
    this.fetchSpaces( inResponse );
  }