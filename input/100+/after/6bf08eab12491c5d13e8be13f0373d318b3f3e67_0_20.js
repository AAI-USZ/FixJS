function() {
    this._super();

    // Register the view for event handling. This hash is used by
    // Ember.EventDispatcher to dispatch incoming events.
    if (!this.isVirtual) Ember.View.views[get(this, 'elementId')] = this;

    // setup child views. be sure to clone the child views array first
    this._childViews = this._childViews.slice();

    Ember.assert("Only arrays are allowed for 'classNameBindings'", Ember.typeOf(this.classNameBindings) === 'array');
    this.classNameBindings = Ember.A(this.classNameBindings.slice());

    Ember.assert("Only arrays are allowed for 'classNames'", Ember.typeOf(this.classNames) === 'array');
    this.classNames = Ember.A(this.classNames.slice());

    var viewController = get(this, 'viewController');
    if (viewController) {
      viewController = get(viewController);
      if (viewController) {
        set(viewController, 'view', this);
      }
    }
  }