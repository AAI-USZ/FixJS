function() {
    this.body = dojo.body();
    this.appConfig = mulberry.app.Config.get('app');

    this._setupFeatureClasses();
    this._setupSiblingNav();

    this._queuedAdTag = false;
    dojo.subscribe('/page/transition/end', this, this._renderQueuedAdTag);

    dojo.connect(m.app.UI, 'showPage', this, '_onShowPage');
    dojo.connect(this.siblingNav, 'show', this, '_onShowSiblingNav');
    dojo.connect(this.siblingNav, 'hide', this, '_onHideSiblingNav');
  }