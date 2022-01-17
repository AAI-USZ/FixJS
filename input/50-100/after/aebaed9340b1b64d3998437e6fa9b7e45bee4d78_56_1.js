function(id) // a markup id from a toolbar
  {
    for (var id_c = "", i = 0; id_c = this.container_ids[i]; i++)
    {
      if (id_c == id)
      {
        this.container_ids.splice(i, 1);
        break;
      }
    }
  }