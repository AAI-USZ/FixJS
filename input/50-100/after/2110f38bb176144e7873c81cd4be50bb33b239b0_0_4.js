function(page_id, id, other_id) {
    this.node(page_id, id).dragTo(this.node(page_id, other_id));
    return this.sendResponse(true);
  }