function(page_id, id, selector) {
    return this.nodeCall(page_id, id, 'find', selector, this.sendResponse);
  }