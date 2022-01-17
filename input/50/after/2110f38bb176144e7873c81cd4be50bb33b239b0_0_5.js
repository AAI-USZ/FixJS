function(page_id, id, value) {
    this.node(page_id, id).set(value);
    return this.sendResponse(true);
  }