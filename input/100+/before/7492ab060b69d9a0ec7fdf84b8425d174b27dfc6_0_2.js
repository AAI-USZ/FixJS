function(text, require, module) {
  var css = {};
  
  var client = !!(typeof location !== 'undefined' && location.href);
  
  css.pluginBuilder = './css.pluginBuilder';
  
  css.buffer = '';
  css.stylesheet = undefined;
  css.loadSuffixes = module.config().enableSuffixes || [];
  
  //support for CSS-API-style handlers for live editing
  css.addHandler = function(css, basePath, handler) {
    if (handler === undefined)
      handler = basePath;
      
    this.add('/*+ ' + handler + ' */\n' + css + '\n/*- ' + handler + '*/', basePath);
  }
  
  css.enableSuffix = function(suffix) {
    if (this.loadSuffixes.indexOf(suffix) == -1)
      this.loadSuffixes.push(suffix);
  }
  
  css.add = function(css, basePath) {
    
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
  
  css.clear = function() {
    this.buffer = '';
    if (client)
      this.applyBufferStyle();
  }
  
  //client-only function!
  css.applyBufferStyle = function() {
    //no link element - create
    if (this.stylesheet === undefined) {
      this.stylesheet = document.createElement('style');
      this.stylesheet.setAttribute('type', 'text/css');
      document.getElementsByTagName('head')[0].appendChild(this.stylesheet);
    }
    this.stylesheet.innerHTML = this.convertStyleBase(this.buffer, require.toUrl('.'), document.baseURI);
  }
  
  /* convert a relative uri to a different base url
   * ../images/img.jpg, /my/site/css/css.css, /my/site/ -> images/img.jpg
   * applies to url(...), url(''), url("") and import(...) statements
   */
  css.convertStyleBase = function(source, fromBase, toBase) {
    
    urlRegEx = /(url\(\s*"(.*)"\s*\))|(url\(\s*'(.*)'\s*\))|(url\(\s*(.*)\s*\))/g;
    
    while (result = urlRegEx.exec(source)) {
      url = this.convertURIBase(result[2] || result[4] || result[6], fromBase, toBase);
      source = source.replace(result[2] || result[4] || result[6], url);
    }
    
    importRegEx = /(@import\s*'(.*)')|(@import\s*"(.*)")/g;
    
    while (result = importRegEx.exec(source)) {
      url = this.convertURIBase(result[2] || result[4], fromBase, toBase);
      source = source.replace(result[2] || result[4], url);
    }
    
    return source;
  }
  
  css.convertURIBase = function(uri, fromBase, toBase) {
    // absolute urls are left in tact
    if (uri.match(/^\/|([^\:\/]*:)/))
      return uri;
    
    return this.relativeURI(this.absoluteURI(uri, fromBase), toBase);
  }
  
  // given a relative URI, calculate the absolute URI
  css.absoluteURI = function(uri, base) {
    
    baseParts = base.split('/');
    uriParts = uri.split('/');
    
    baseParts.pop();
    
    while (curPart = uriParts.shift())
      if (curPart == '..')
        baseParts.pop();
      else
        baseParts.push(curPart);
    
    return baseParts.join('/');
  }


  // given an absolute URI, calculate the relative URI
  css.relativeURI = function(uri, base) {
    
    // reduce base and uri strings to just their difference string
    baseParts = base.split('/');
    baseParts.pop();
    base = baseParts.join('/') + '/';
    i = 0;
    while (base.substr(i, 1) == uri.substr(i, 1))
      i++;
    while (base.substr(i, 1) != '/')
      i--;
    base = base.substr(i + 1);
    uri = uri.substr(i + 1);

    // each base folder difference is thus a backtrack
    baseParts = base.split('/');
    uriParts = uri.split('/');
    out = '';
    while (baseParts.shift())
      out += '../';
    
    // finally add uri parts
    while (curPart = uriParts.shift())
      out += curPart + '/';
    
    return out.substr(0, out.length - 1);
  }

  css.load = function(name, req, load, config) {
    var suffix = name.match(/\[([^\]]*)\]/);
    
    if (suffix) {
      suffix = suffix[0];
      if (suffix != '')
        name = name.replace(/\[([^\]]*)\]/, '-$1');
      else
        name = name.replace(/\[([^\]]*)\]/, '');
    }
    
    //ignore suffix loads unless specifically enabled or empty suffix
    if (suffix && (suffix != '' || this.loadSuffixes.indexOf(suffix) == -1)) {
      load(css);
      return;
    }
      
    
    if (name.substr(0, 1) == '>')
      throw 'CSS buffer and write points can only be defined for builds.';
    
    req(['text!' + name + '.css'], function(CSS) {
      css.add(CSS, name);
      load(css);
    });
  };
  
  return css;
}