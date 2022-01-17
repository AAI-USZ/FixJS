function NixieClock(target) {
  var nixie = this;
  
  if($(target).length === 0) {
    return false;
  } else {
    nixie.targetElement = $(target);
    return nixie;
  }
}