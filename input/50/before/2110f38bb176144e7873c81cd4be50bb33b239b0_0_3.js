function(page_id, id, name) {
    return this.nodeCall(page_id, id, 'getAttribute', name, this.sendResponse);
  }