function(page_id, id, callback) {
    if (page_id === this.page_id) {
      return callback.call(this, this.page.get(id));
    } else {
      return this.owner.sendError(new Poltergeist.ObsoleteNode);
    }
  }