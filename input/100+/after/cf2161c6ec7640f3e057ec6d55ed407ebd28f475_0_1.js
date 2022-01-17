function(view, transitionOrCallback, callback) {
  if (this.getHidden()) {
    var activeView = this.getActiveView();
    activeView.$trigger($.Event(Pushpop.EventType.WillPresentView, {
      view: activeView,
      action: 'modal-push'
    }));
    
    this.present();
    
    activeView.$trigger($.Event(Pushpop.EventType.DidPresentView, {
      view: activeView,
      action: 'modal-push'
    }));
  }
  
  // Call the "super" method.
  Pushpop.ViewStack.prototype.push.apply(this, arguments);
}