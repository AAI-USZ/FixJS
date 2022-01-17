function(page_id, id, value) {
    return this.nodeCall(page_id, id, 'isMultiple', function(multiple, node) {
      if (multiple) {
        node.removeAttribute('multiple');
      }
      node.setAttribute('_poltergeist_selected', '');
      this.page.uploadFile('[_poltergeist_selected]', value);
      node.removeAttribute('_poltergeist_selected');
      if (multiple) {
        node.setAttribute('multiple', 'multiple');
      }
      return this.sendResponse(true);
    });
  }