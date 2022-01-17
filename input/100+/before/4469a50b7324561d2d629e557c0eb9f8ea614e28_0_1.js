function() {
    console.debug(this.options.lastSaved);
    this.lastSaved = _.isUndefined(this.options.lastSaved) ? undefined : (_.isDate(this.options.lastSaved) ? this.options.lastSaved : new Date(this.options.lastSaved));
    this.dispatcher = this.options.dispatcher;

    this.dispatcher.on('save:section', this.updateLastSaved, this);
    this.dispatcher.on('save:story', this.updateLastSaved, this);
  }