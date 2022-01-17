function(window) {
    panel_window = window;
    panel_window.chrome.devtools = chrome.devtools;
    attachToPanel(panel_window);
  }