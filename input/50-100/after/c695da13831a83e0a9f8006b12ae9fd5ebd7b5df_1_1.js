function() {

  //check if config JavaScript was successfully inserted. Load defaults otherwise.
  if(typeof jQueryColorboxSettingsArray !== 'object') {
    jQueryColorboxSettingsArray = getColorboxConfigDefaults();
  }

  if (jQueryColorboxSettingsArray.autoColorboxJavaScript === "true") {
    colorboxAddManualClass();
  }
  if (jQueryColorboxSettingsArray.colorboxAddClassToLinks === "true") {
    colorboxAddClassToLinks();
  }
  if (jQueryColorboxSettingsArray.autoHideFlash === "true") {
    colorboxHideFlash();
    colorboxShowFlash();
  }
  colorboxSelector();
}