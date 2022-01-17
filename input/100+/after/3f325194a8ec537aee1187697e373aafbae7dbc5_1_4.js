function(m) {

var adsClass = 'has-ads',
    // used to nudge the page up depending on state of sibling nav
    siblingNavClass = 'has-sibling-nav',
    siblingNavOpenClass = 'sibling-nav-open';

dojo.declare('toura.UI', dojo.Stateful, {
  constructor : function() {
    this.body = dojo.body();
    this.appConfig = mulberry.app.Config.get('app');

    this._setupFeatureClasses();
    this._setupSiblingNav();

    this._queuedAdTag = false;
    dojo.subscribe('/page/transition/end', this, this._renderQueuedAdTag);

    dojo.connect(m.app.UI, 'showPage', this, '_onShowPage');
    dojo.connect(this.siblingNav, 'show', this, '_onShowSiblingNav');
    dojo.connect(this.siblingNav, 'hide', this, '_onHideSiblingNav');
  },

  _onShowPage : function(page, node) {
    if (this.siblingNav) {
      this.siblingNav.set('node', node);
    }

    this._setupAdTag();
  },

  _setupFeatureClasses : function() {
    dojo.forIn(toura.features, function(feature, enabled) {
      if (!enabled) { return; }
      dojo.addClass(this.body, 'feature-' + feature);
    }, this);
  },

  _setupSiblingNav : function() {
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
  },

  _onShowSiblingNav : function (argument) {
    dojo.addClass(dojo.body(), siblingNavClass);
  },

  _onHideSiblingNav :  function(argument) {
    dojo.removeClass(dojo.body(), siblingNavClass);
  },

  _renderQueuedAdTag : function() {
    if (this._queuedAdTag && dojo.isFunction(this._queuedAdTag)) {
      this._queuedAdTag();
      this._queuedAdTag = false;
    }
  },

  _setupAdTag : function() {
    if (!toura.features.ads) { return; }

    var currentPage = m.app.UI.currentPage,
        isHomeNode = currentPage && currentPage.baseObj.isHomeNode,
        b = dojo.body();

    if (this.adTag) {
      this.adTag.destroy();
    }

    if (isHomeNode) { return; }

    this._queuedAdTag = dojo.hitch(this, function() {
      mulberry.app.PhoneGap.network.isReachable()
        .then(dojo.hitch(this, function(isReachable) {
          if (!isReachable) { return; }

          if (this.appConfig.ads && this.appConfig.ads[m.Device.type]) {
            if (currentPage) {
              currentPage.addClass(adsClass);
            }

            this.adTag = m.app.UI.addPersistentComponent(
              toura.components.AdTag,
              { adConfig : this.appConfig.ads[m.Device.type] },
              'last'
            );

            this.adTag.startup();
          }
        }));
    });
  }

});

dojo.subscribe('/ui/ready', function() {
  toura.UI = new toura.UI();
});

}