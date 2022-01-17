function(msg)
  {
    if (msg.profile == window.app.profiles.DEFAULT)
    {
      __activeTab = [];
      __window_id = 0;
      document_map = {};
      cleanUpEventListener();
    }
  }