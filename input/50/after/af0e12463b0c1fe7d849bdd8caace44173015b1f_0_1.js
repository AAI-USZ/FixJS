function(obj)
  {
    this._objects[obj.object_id] = obj;
    var id = obj.id || obj.name;
    if (id)
      this[id] = obj;
    else
      throw "The object must have and id or a name";
  }