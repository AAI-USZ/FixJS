function(page_id, id, value) {
    return this.nodeCall(page_id, id, 'select', value, this.sendResponse);
  }