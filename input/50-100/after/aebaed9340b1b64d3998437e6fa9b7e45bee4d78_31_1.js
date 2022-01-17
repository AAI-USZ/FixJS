function(msg)
  {
    if (msg.profile == window.app.profiles.DEFAULT)
      this.ondestroy();
  }