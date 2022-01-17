  get hourInput() {
    delete this.hourInput;
    return this.hourInput =
      document.querySelector('input[name="alarm.hour"]');
  },
