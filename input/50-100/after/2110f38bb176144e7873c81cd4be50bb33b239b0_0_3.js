function(page_id, id, value) {
    var multiple, node;
    node = this.node(page_id, id);
    multiple = node.isMultiple();
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
  }