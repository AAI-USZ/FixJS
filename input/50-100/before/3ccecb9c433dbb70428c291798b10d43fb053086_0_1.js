function safariMessageHandler(event) {
  if (event.name == "refreshSettings") {
    safari.self.tab.dispatchMessage("getSettings");
    return;
  }
  var savedSettings = event.message.data;
  settings = parseSettings(savedSettings);
  applySettings();
  WaitForPosts();
}