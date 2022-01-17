function(event) {
    if(!this.showingDatepicker) {
      $('#transaction-modal').parent().remove();
    }
    this.showingDatepicker = false;
  }