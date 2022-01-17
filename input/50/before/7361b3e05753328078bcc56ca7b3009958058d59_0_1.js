function() {
  if (eXo.core.Browser.browserType == 'ie') {
    document.onkeydown = null ;
  }
  document.onkeypress = null ;
  this.listeners = [] ;
}