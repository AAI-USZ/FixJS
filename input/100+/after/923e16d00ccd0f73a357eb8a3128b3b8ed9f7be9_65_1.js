function()
  {
    // ignore any updates before a profile is enabled
    if (_ignore_updates)
      return;

    var is_enabled = this.is_enabled;  
    for (var i = 0, id = ""; id = this.container_ids[i]; i++)
    {
      var container = document.getElementById(id);
      if (container)
      {
        if (is_enabled)
          this.createView(container);
        else
          this.create_disabled_view(container);

        messages.post('view-created', {id: this.id,
                                       container: container,
                                       is_enabled: is_enabled});
      }
    }
  }