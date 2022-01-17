function(id) // a markup id from a toolbar
  {
    var id_c = '', i = 0;
    for( ; ( id_c = this.container_ids[i] ) && id_c != id; i++);
    if( id_c )
    {
      this.container_ids.splice(i, 1);
    }
  }