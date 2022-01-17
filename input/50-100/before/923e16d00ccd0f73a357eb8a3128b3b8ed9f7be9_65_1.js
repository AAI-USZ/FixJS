function(filters)
  {
    var 
      id = '', 
      i = 0,
      ret = [];
    for( ; id = ids[i]; i++)
    {
      if(views[id].type == 'single-view' && ( !filters || !filter(views[id], filters) ) )
      {
        ret[ret.length] = id;
      }
    }
    return ret;
  }