function(id)
  {
    if (this._current_context)
    {
      return this._current_context.get_resource(id);
    }
    return null;
  }