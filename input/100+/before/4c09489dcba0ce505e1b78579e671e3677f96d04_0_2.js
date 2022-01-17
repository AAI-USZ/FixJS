function(viewOrTransition, transitionOrCallback, callback) {
  if (this.views.length <= 1) {
    var activeView = this.getActiveView();
    activeView.$trigger($.Event(Pushpop.EventType.WillDismissView, {
      view: activeView,
      action: 'modal-push'
    }));
    
    this.dismiss();
    
    activeView.$trigger($.Event(Pushpop.EventType.DidDismissView, {
      view: activeView,
      action: 'modal-push'
    }));
  }
  
  // Call the "super" method.
  Pushpop.ViewStack.prototype.pop.apply(this, arguments);
}