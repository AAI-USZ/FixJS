function() {
    // don't display sibling nav for certain cases
    if (!toura.features.siblingNav) { return; }
    if (mulberry.Device.os === 'browser' && mulberry.Device.browserOS === 'ios' && !mulberry.Device.standalone) { return; }
    if (toura.features.ads && this.appConfig.ads && this.appConfig.ads[m.Device.type]) { return; }

    this.siblingNav = m.app.UI.addPersistentComponent(toura.components.SiblingNav, {}, 'first');

    // add/remove nudge classes when sibling nav opens/closes
    dojo.connect(this.siblingNav, 'open', this, function() {
      dojo.addClass(dojo.body(), siblingNavOpenClass);
      dojo.publish('/window/resize');
    });

    dojo.connect(this.siblingNav, 'close', this, function() {
      dojo.removeClass(dojo.body(), siblingNavOpenClass);
      dojo.publish('/window/resize');
    });
  }