function() {
  if (this.eventRegister) {
    this.eventRegister.removeAll();
  }

  if ((goog.userAgent.product.IPHONE || goog.userAgent.product.IPAD) &&
      this.usesIframe() && this.shouldRefocusOnInputMobileSafari()) {
    try {
      var editWindow = this.getEditableDomHelper().getWindow();
      editWindow.removeEventListener(goog.events.EventType.KEYDOWN,
          this.boundRefocusListenerMobileSafari_, false);
      editWindow.removeEventListener(goog.events.EventType.TOUCHEND,
          this.boundRefocusListenerMobileSafari_, false);
    } catch (e) {
      // The editWindow no longer exists, or has been navigated to a different-
      // origin URL. Either way, the event listeners have already been removed
      // for us.
    }
    delete this.boundRefocusListenerMobileSafari_;
  }
  if (goog.userAgent.OPERA && this.usesIframe()) {
    try {
      var editWindow = this.getEditableDomHelper().getWindow();
      editWindow.removeEventListener(goog.events.EventType.FOCUS,
          this.boundFocusListenerOpera_, false);
      editWindow.removeEventListener(goog.events.EventType.BLUR,
          this.boundBlurListenerOpera_, false);
    } catch (e) {
      // The editWindow no longer exists, or has been navigated to a different-
      // origin URL. Either way, the event listeners have already been removed
      // for us.
    }
    delete this.boundFocusListenerOpera_;
    delete this.boundBlurListenerOpera_;
  }

  if (this.changeTimerGecko_) {
    this.changeTimerGecko_.stop();
  }
  this.delayedChangeTimer_.stop();
}