function(viewOrTransition, transitionOrCallback, callback) {
  if (this.views.length <= 1) this.dismiss();
  
  // Call the "super" method.
  Pushpop.ViewStack.prototype.pop.apply(this, arguments);
}