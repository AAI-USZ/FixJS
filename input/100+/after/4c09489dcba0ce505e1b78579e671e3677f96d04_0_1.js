function(view, transitionOrCallback, callback) {
  if (this.getHidden()) this.present();
  
  // Call the "super" method.
  Pushpop.ViewStack.prototype.push.apply(this, arguments);
}