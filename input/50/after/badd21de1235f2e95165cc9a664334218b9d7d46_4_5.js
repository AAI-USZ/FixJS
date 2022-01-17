function callSetup(evt) {
  window.removeEventListener('load', callSetup);
  KeypadManager.init();
  // In the case of the oncall.html page (during the call),
  //  the lower 3 button toolbar is not shown.
  KeypadManager.phoneNumberViewContainer.classList.add("no-toolbar"); 
  CallScreen.init();
  OnCallHandler.setup();
}