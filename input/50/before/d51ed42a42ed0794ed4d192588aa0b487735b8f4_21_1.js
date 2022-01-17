function(rid, data)
  {
    var res = this._service.get_resource_for_id(rid);
    if (res)
    {
      this._view = this._open_resource_tab(res, data);
      return true;
    }
    return false;
  }