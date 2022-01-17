function showBody() {
  document.documentElement.lang = navigator.mozL10n.language.code;
  document.documentElement.dir = navigator.mozL10n.language.direction;
  // <body> children are hidden until the UI is translated
  document.body.classList.remove('hidden');
  ClockView.init();
  AlarmList.init();
  AlarmEditView.init();
  RepeatPickerView.init();
  SoundPickerView.init();
  SnoozePickerView.init();
  ColorPickerView.init();
}