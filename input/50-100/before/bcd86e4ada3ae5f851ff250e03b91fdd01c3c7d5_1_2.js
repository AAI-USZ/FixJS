function updateMessageField() {
      this.input.value = '';
      this.updateInputHeight();
      this.input.focus();

      if (this.filter) {
        this.renderMessages(this.filter, message);
        return;
      }
      this.renderMessages(num, message);
    }