function(page_id, id, selector) {
    return this.sendResponse(this.node(page_id, id).find(selector));
  }