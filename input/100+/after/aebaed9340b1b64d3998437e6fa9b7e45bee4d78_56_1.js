function()
  {
    for (var i = 0, id; id = this.container_ids[i]; i++)
    {
      var toolbar = document.getElementById(id);
      if (toolbar)
      {
        var overlay = toolbar.querySelector(".disabled-toolbar-overlay");
        if (overlay)
          toolbar.removeChild(overlay);
      }
    }
  }