function loadCustomCSS() {
  try {
    var customCSS = Settings.get('background.configure.css');
    var style = document.createElement('style')
    style.innerHTML = customCSS
    document.getElementsByTagName('head')[0].appendChild(style)
  } catch (e) {
    console.debug("Custom CSS failed to load", e);
  }
}