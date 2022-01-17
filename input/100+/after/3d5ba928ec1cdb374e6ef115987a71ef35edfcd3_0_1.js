function (v) {
    var currentDocId = v(ns.currentDocumentIdCell);
    if (currentDocId) {
      return;
    }
    var param = _.extend({}, v(ns.filter.filterParamsCell));
    var page = v.need(ns.currentDocumentsPageNumberCell);
    var limit = v(ns.currentPageLimitCell);
    var skip = page * limit;
    var url = v.need(ns.dbURLCell);

    param.skip = String(skip);
    param.include_docs = true;
    param.limit = String(param.startkey || param.endkey ? limit + 1 : limit);

    return buildURL(url, "_all_docs", param);
  }