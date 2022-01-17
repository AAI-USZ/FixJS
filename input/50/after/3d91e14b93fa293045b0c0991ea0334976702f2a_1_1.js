function (element) {
  this.prefix = "mwt";
  this.element = element || $('body');
    
  this.interceptAllLinks();
}