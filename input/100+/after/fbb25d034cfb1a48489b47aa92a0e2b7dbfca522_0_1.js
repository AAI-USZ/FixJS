function thui_init() {
    this.delNumList = [];
    this.headerIndex = 0;

    this.sendButton.addEventListener('click', this.sendMessage.bind(this));
    this.pickButton.addEventListener('click', this.pickContact.bind(this));
    this.input.addEventListener('input', this.updateInputHeight.bind(this));
    this.view.addEventListener('click', this);

    var windowEvents = ['resize', 'keyup', 'transitionend'];
    windowEvents.forEach(function(eventName) {
      window.addEventListener(eventName, this);
    }, this);
  }