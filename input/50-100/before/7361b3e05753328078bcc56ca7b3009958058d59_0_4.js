function(event) {
  if(eXo.core.Browser.browserType == 'ie') { // Cancel bubble for ie
    window.event.cancelBubble = true ;
    window.event.returnValue = true ;
    return ;
  } else { // Cancel event for Firefox, Opera, Safari
    event.stopPropagation() ;
    event.preventDefault() ;
  }
}