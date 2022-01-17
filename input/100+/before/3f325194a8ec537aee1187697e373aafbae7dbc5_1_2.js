function() {
    if (!toura.features.siblingNav) { return; }
    if (mulberry.Device.os === 'browser' && mulberry.Device.browserOS === 'ios' && !mulberry.Device.standalone) { return; }
    if (toura.features.ads && this.appConfig.ads && this.appConfig.ads[m.Device.type]) { return; }

    var currentPage = m.app.UI.currentPage;
    
    this.siblingNav = m.app.UI.addPersistentComponent(toura.components.SiblingNav, {}, 'first');
    this.set('siblingNavVisible', false);

    dojo.connect(this.siblingNav, 'show', this, function() {
      if (currentPage) {
        currentPage.addClass(siblingNavClass);
        dojo.publish('/window/resize');
      }
    });

    dojo.connect(this.siblingNav, 'hide', this, function() {
      if (currentPage) {
        currentPage.removeClass(siblingNavClass);
        dojo.publish('/window/resize');
      }
    });
  }