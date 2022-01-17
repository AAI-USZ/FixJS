function() 
  {
    var id = '', i = 0, c = null, ret = [];
    for( ; id = this.container_ids[i]; i++)
    {
      if( c = document.getElementById(id) )
      {
        ret[ret.length] = c;
      }
    }
    return ret;
  }