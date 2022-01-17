function(msg)
  {
    if (msg.profile == window.app.profiles.DEFAULT)
    {
      this.ondestroy();
      this._toolbar_visibility = false;
      topCell.setTooolbarVisibility("command_line", false);
    }
  }