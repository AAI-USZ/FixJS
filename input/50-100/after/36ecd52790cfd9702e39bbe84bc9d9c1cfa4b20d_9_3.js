function(msg)
  {
    if (!this._context)
      return;

    var data = new cls.ResourceManager["1.0"].UrlRedirect(msg);
    // a bit of cheating since further down we use .resouceID to determine
    // what resource the event applies to:
    data.resourceID = data.fromResourceID;
    this._context.update("urlredirect", data);
  }