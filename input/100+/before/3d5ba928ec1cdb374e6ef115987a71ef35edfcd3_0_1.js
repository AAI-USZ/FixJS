function (v) {
    var currentDocId = v(ns.currentDocumentIdCell);
    if (currentDocId) {
      return;
    }
    var param = {};
    var page = v.need(ns.currentDocumentsPageNumberCell);
    var limit = v(ns.currentPageLimitCell);
    var searchTerm = v(ns.searchedDocumentCell);
    var skip = page * limit;

    param.skip = String(skip);

    if (searchTerm) {
      param.limit = String(limit + 1);
      param.startkey = JSON.stringify(searchTerm);
      param.endkey = JSON.stringify(searchTerm + String.fromCharCode(0xffff));
    } else {
      param.limit = String(limit);
    }

    return buildURL(v.need(ns.dbURLCell), "_all_docs", param);
  }