function ContentSecurityPolicy() {
  CSPdebug("CSP CREATED");
  this._isInitialized = false;
  this._reportOnlyMode = false;
  this._policy = CSPRep.fromString("default-src *");

  // default options "wide open" since this policy will be intersected soon
  this._policy._allowInlineScripts = true;
  this._policy._allowEval = true;

  this._request = "";
  this._docRequest = null;
  CSPdebug("CSP POLICY INITED TO 'default-src *'");
}