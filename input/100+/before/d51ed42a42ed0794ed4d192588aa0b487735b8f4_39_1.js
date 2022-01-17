function()
  {
    var 
    id = '', 
    i = 0, 
    container = null,
    buttons = null,
    button = null,
    j = 0;

    for( ; id = this.container_ids[i]; i++)
    {
      container = document.getElementById(id);
      
      if( container )
      {
        buttons = container.getElementsByTagName('toolbar-buttons')[0].getElementsByClassName('ui-button');
        for( j = 0; button = buttons[j]; j++)
        {
          this.buttons[j].disabled ?
            button.setAttribute("disabled", "") :
            button.removeAttribute("disabled");
        }
      }
    }
  }