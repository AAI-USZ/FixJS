function callSetup(evt) {
  window.removeEventListener('load', callSetup);
  KeypadManager.init();
  CallScreen.init();
  OnCallHandler.setup();
}