function (ev, model, collection, options) {
    if (collection !== this) {
      if (ev === 'change' && this.liveupdate_keys === 'all') {
        this._updateModelMembership(model);
      } else if (ev.slice(0, 7) === 'change:' && _.isArray(this.liveupdate_keys)
                 && _.include(this.liveupdate_keys, ev.slice(7))) {
        this._updateModelMembership(model);
      }

      if (ev === 'add' && this.sieve(model) && !options.noproxy) {
        this._addToSubset(model, options);
      }

      if (ev === 'remove' && this.sieve(model) && !options.noproxy) {
        this._removeFromSubset(model, options);
      }
    }

    // model == collection
    if (ev === 'reset' && model !== this) {
      if (!collection.subset_reset) {
        this._resetSubset(model.models, collection);
      }
    }
  }