function() {
  if (gj.browser.msie != undefined) {
    document.onkeydown = null ;
  }
  document.onkeypress = null ;
  this.listeners = [] ;
}