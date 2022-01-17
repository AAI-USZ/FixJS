function(window) {
    if (!panel_window) {        
      panel_window = window;
      panel_window.chrome.devtools = chrome.devtools;
      attachToPanel(panel_window);
    }
  }