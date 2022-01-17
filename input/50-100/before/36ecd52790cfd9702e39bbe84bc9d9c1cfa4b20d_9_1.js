function(msg)
  {
    var data = new cls.DocumentManager["1.0"].AboutToLoadDocument(msg);
    // if not a top resource, just ignore. This usually means it's an iframe
    if (data.parentDocumentID) { return; }
    this._current_context = new cls.ResourceContext();
  }