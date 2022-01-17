function(page_id, id) {
    return this.nodeCall(page_id, id, 'tagName', this.sendResponse);
  }