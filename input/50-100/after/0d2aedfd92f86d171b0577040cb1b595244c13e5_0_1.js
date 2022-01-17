function BlueskyStore(options) {
    options = options || {};
    Store.call(this, options);
    this.storage = bluesky.storage({account: options.account, key: options.key});
    this.table = this.storage.table(options.table);

    // Just in case it doesn't already exist
    this.storage.createTable(options.table);
  }