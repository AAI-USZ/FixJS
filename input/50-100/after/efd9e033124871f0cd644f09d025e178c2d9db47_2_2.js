function( directoryJson ) {
    delete directoryJson.originator;

    this.spaceCount = this.size();

    this.state = "spacesFetch";

    for( var space in directoryJson ) {
      // Filter originator being added to emitted events
      var url = directoryJson[space];
      if( typeof( url ) == "string" ) {
        // FIXME: techinc has a bad SSL cert
        if( url.match(/techinc.nl/) )
        {
          url.replace("https", "http");
          directoryJson[url] = directoryJson[space];
          delete directoryJson[space];
        }
        this.fetchSpace( url );
      }
    }
  }