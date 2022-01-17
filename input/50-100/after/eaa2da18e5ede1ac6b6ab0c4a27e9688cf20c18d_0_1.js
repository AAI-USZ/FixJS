function NixieClock(target) {
  var nixie = this;
  
  if($(target).length === 0) {
    console.error('Element “' + target + '” does not exist!');
    return false;
  } else {
    nixie.targetElement = $(target);
    return nixie;
  }
}