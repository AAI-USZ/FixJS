function(page_id, id) {
    return this.sendResponse(this.node(page_id, id).tagName());
  }