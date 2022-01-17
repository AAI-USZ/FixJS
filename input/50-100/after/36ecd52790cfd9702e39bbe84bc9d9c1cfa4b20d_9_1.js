function(msg)
  {
    var data = new cls.DocumentManager["1.0"].AboutToLoadDocument(msg);

    if (!data.parentFrameID)
      this._context = new cls.ResourceContext(data);

    if (this._context)
      this._context.update("abouttoloaddocument", data);

  }