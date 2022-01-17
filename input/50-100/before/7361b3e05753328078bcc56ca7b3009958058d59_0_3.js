function() {
  if (eXo.core.Browser.browserType == 'ie') {
    document.onkeydown = function(e) {
      return eXo.core.Keyboard.onKeyDown(e) ;
    }
  }
  document.onkeypress = function(e) {
    return eXo.core.Keyboard.onKeyPress(e) ;
  } ;
}