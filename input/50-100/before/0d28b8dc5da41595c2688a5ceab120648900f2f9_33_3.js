function thui_init() {
    this.sendButton.addEventListener('click', this.sendMessage.bind(this));
    this.pickButton.addEventListener('click', this.pickContact.bind(this));
    this.deleteAllButton.addEventListener('click',
      this.deleteAllMessages.bind(this));
    this.deleteSelectedButton.addEventListener('click',
      this.deleteMessages.bind(this));
    this.input.addEventListener('input', this.updateInputHeight.bind(this));
  }