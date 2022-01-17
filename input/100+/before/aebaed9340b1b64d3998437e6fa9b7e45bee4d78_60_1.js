function(ele) // for testing
  {
    if( ele )
    {
      this.createView(ele);
    }
    else
    {
      var id = '', i = 0, container = null;
      
      for( ; id = this.container_ids[i]; i++)
      {
        container = document.getElementById(id);
        if (container)
        {
          this.createView(container);
          messages.post('view-created', {id: this.id, container: container});
        }
        // if actions[this.id] actions[this.id].onViewUpdate(cotainer)
      }


    }
  }