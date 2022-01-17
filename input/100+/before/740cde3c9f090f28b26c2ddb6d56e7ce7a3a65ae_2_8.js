function() {
    // Enforce API revisioning. See BREAKING_CHANGES.md for more.
    var revision = get(this, 'revision');

    if (revision !== DS.CURRENT_API_REVISION && !Ember.ENV.TESTING) {
      throw new Error("Error: The Ember Data library has had breaking API changes since the last time you updated the library. Please review the list of breaking changes at https://github.com/emberjs/data/blob/master/BREAKING_CHANGES.md, then update your store's `revision` property to " + DS.CURRENT_API_REVISION);
    }

    if (!get(DS, 'defaultStore') || get(this, 'isDefaultStore')) {
      set(DS, 'defaultStore', this);
    }

    // internal bookkeeping; not observable
    this.typeMaps = {};
    this.recordCache = [];
    this.clientIdToId = {};
    this.recordArraysByClientId = {};

    set(this, 'defaultTransaction', this.transaction());

    return this._super();
  }