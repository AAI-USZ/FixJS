function (element) {
  this.prefix = "ios-callback";
  this.element = element || $('body');
    
  this.interceptAllLinks();
}