function(page_id, id, name) {
    return this.sendResponse(this.node(page_id, id).getAttribute(name));
  }