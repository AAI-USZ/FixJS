function(obj) {
    Ember.assert('Must pass a valid object to Ember.Binding.connect()', !!obj);

    var fromPath = this._from, toPath = this._to;
    Ember.trySetPath(obj, toPath, getPathWithGlobals(obj, fromPath));

    // add an observer on the object to be notified when the binding should be updated
    Ember.addObserver(obj, fromPath, this, this.fromDidChange);

    // if the binding is a two-way binding, also set up an observer on the target
    if (!this._oneWay) { Ember.addObserver(obj, toPath, this, this.toDidChange); }

    this._readyToSync = true;

    return this;
  }