function(msg)
  {
    if (!this._context)
      return;

    var data = new cls.ResourceManager["1.0"].Response(msg);
    this._context.update("response", data);
  }