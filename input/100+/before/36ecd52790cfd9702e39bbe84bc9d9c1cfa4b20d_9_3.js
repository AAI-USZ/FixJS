function(eventname, event)
  {
    var res = this.get_resource(event.resourceID);

    if (eventname == "urlload" && !res)
    {
      res = new cls.Resource(event.resourceID);
      this.resources.push(res);
    }
    else if (!res)
    {
      // ignoring. Never saw an urlload, or it's allready invalidated
      return
    }

    res.update(eventname, event);

    if (res.invalid)
    {
      this.resources.splice(this.resources.indexOf(res), 1);
    }
  }