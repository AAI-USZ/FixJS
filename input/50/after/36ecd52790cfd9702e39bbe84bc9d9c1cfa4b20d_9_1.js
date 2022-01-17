function(url)
  {
    if (!this._context){ return null; }

    var id = this._context.resourcesUrlDict[url];
    if (id===undefined){ return null; }
    
    return this.get_resource(id);
  }