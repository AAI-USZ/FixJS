function(eventname, event)
  {
    if (eventname == "abouttoloaddocument")
    {
      var frame = event;
      frame.closed = !!event.parentFrameID;
      frame.groups =
      {
        markup: new cls.ResourceGroup('markup','markup'),
        css: new cls.ResourceGroup('stylesheets','css'),
        script: new cls.ResourceGroup('scripts','script'),
        image: new cls.ResourceGroup('images','image'),
        font: new cls.ResourceGroup('fonts','font'),
        other: new cls.ResourceGroup('other','other')
      }

      this.frames[ event.frameID ] = frame;
      return;
    }

    var res = this.get_resource(event.resourceID);
    if (eventname == "urlload" && !res)
    {
      res = new cls.Resource(event.resourceID);
      res.frameID = event.frameID;
      this.resourcesDict[ res.id ] = res;
    }
    else if (!res)
    {
      // ignoring. Never saw an urlload, or it's allready invalidated
      return;
    }

    res.update(eventname, event);

    if (res.invalid)
    {
      delete this.resourcesDict[ res.id ];
    }
    else if (eventname == "urlfinished")
    {
      // push the resourceID into the proper group
      var frame = this.frames[res.frameID];
      var type = res.type;
      if (!frame.groups[type]){ type='other'; }

      frame.groups[type].push( res.id );
      this.resourcesUrlDict[ res.url ] = res.id;

      return res;
    }
  }