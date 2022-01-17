function(event) {
  var keynum = this.getKeynum(event) ; 
  var keychar = '' ;
  var eventHandler = false ;

  if (eXo.core.Browser.browserType == 'ie' && this.controlKeyCodes.contains(keynum)) {
    return false ;
  }
  
  if(keynum == 13) {
    eventHandler = 'onEnter' ;
  } else if(keynum == 9) {
    eventHandler = 'onTab' ;
  } else if(keynum == 8) {
    eventHandler = 'onBackspace' ;
  } else if(keynum == 27) {
    eventHandler = 'onEscapse' ;
  } else if(keynum == 46) {
    eventHandler = 'onDelete' ;
  } else if(keynum == 37){
    eventHandler = 'onLeftArrow' ;
  } else if(keynum == 39){
    eventHandler = 'onRightArrow' ;
  } else if(keynum == 38){
    eventHandler = 'onUpArrow' ;
  } else if(keynum == 40){
    eventHandler = 'onDownArrow' ;
  } else if(keynum == 36){
    eventHandler = 'onHome' ;
  } else if(keynum == 35){
    eventHandler = 'onEnd' ;
  }
  
  if (!eventHandler) keychar = String.fromCharCode(keynum) ;
  if((keynum >= 65 && keynum <= 90) || (keynum >= 97 && keynum <= 122)) {
    eventHandler = 'onAlphabet' ;
  } else if(keynum >= 48 && keynum <= 57) {
    eventHandler = 'onDigit' ;
  } else if(((keynum >= 32 && keynum <= 34) || (keynum >= 41 && keynum <= 47) || 
            (keynum >= 58 && keynum <= 64) || (keynum >= 91 && keynum <= 96) || 
            (keynum >= 123 && keynum <= 65532)) && !this.controlKeyCodes.contains(keynum)) {
    eventHandler = 'onPunctuation' ;
  }
  
  return this.listenerCallback(eventHandler, event, keynum, keychar) ;
}