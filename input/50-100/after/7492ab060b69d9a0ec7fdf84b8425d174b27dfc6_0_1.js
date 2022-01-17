function(css, basePath) {
    
    //CSS paths are normalized based on an optional basePath and the requirejs config
    //If a basePath is provided, this is assumed to specify the location of the css root
    //relative to the baseUrl in requirejs.
    //If a basePath is not provided, the paths are all expected to be relative to the
    //baseUrl anyway
    //The conversion into 'buffer space' normalizes all urls to the requirejs baseUrl
    //The injection on the client normalizes from baseUrl to the page baseURI
    //to flatten all css dependencies.
    //Absolute dependencies are left untouched.
    
    if (basePath)
      css = this.convertStyleBase(css, require.toUrl(basePath), require.toUrl('.'));
    
    this.buffer += css;
    
    if (client)
      this.applyBufferStyle();
  }