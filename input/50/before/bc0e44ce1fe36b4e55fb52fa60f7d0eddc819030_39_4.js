  get minuteInput() {
    delete this.minuteInput;
    return this.minuteInput =
      document.querySelector('input[name="alarm.minute"]');
  },
