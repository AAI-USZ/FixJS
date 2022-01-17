function BlueskyStore(options) {
    options = options || {};
    Store.call(this, options);
    this.table = new bluesky.storage({account: options.account, key: options.key}).table(options.table);
  }