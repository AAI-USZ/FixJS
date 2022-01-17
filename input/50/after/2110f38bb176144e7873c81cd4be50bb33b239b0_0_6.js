function(page_id, id, value) {
    return this.sendResponse(this.node(page_id, id).select(value));
  }