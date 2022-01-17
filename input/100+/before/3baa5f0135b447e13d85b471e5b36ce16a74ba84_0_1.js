function(aChannel) {
    if (!aChannel)
      return;

    // Save the docRequest for fetching a policy-uri
    this._docRequest = aChannel;

    // save the document URI (minus <fragment>) and referrer for reporting
    let uri = aChannel.URI.cloneIgnoringRef();
    uri.userPass = '';
    this._request = uri.asciiSpec;

    let referrer = aChannel.referrer.cloneIgnoringRef();
    referrer.userPass = '';
    this._referrer = referrer.asciiSpec;
  }