function(msg)
  {
    if(this.hasTab(msg.view_id))
    {
      this._get_tab(msg.view_id).name = window.views[msg.view_id].name;
      if(this.isvisible())
      {
        this.render();
      }
    }
  }