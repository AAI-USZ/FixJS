function( inSender, inResponse ) {
    this.state = "directoryFetched";
    this.directoryData = inResponse;

    this.doDirectoryFetched( inResponse );
    this.fetchSpaces( inResponse );
  }