function(msg)
  {
    if (!this._current_context) { return; }
    var data = new cls.ResourceManager["1.2"].UrlLoad(msg);

    //bail if we get dupes. Why do we get dupes? fixme
    //if (data.resourceID in this._current_document.resourcemap) { return }
    this._current_context.update("urlload", data);
  }