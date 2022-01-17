function(page_id, id, other_id) {
    return this.sendResponse(this.node(page_id, id).isEqual(this.node(page_id, other_id)));
  }