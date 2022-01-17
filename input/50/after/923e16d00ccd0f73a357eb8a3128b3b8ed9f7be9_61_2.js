function(handler, title)
  {
    var buttons = this.getButtonsByHandler(handler);
    for (var i = 0; button = buttons[i]; i++)
    {
      button.title = title;
    }
    this.updateButtons();
  }