function(msg)
  {
    if (!this._context)
      return;

    var data = new cls.ResourceManager["1.2"].UrlLoad(msg);
      //bail if we get dupes. Why do we get dupes? fixme
      //if (data.resourceID in this._current_document.resourcemap) { return }

    this._context.update("urlload", data);
    this._view.update();

  }