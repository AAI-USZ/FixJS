function(page_id, id, event) {
    this.node(page_id, id).trigger(event);
    return this.sendResponse(event);
  }