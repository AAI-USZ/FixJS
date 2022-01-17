function(error) {
  error = error || '';
  if (this.elements.error) {

    // Set the error text.
    this.elements.error.text(error);
    if (error) {
      // Show the error message.
      this.elements.error.show();

      // Only show this error for a time interval.
      setTimeout((function(player) {
        return function() {
          player.elements.error.hide('slow');
        };
      })(this), 5000);
    }
    else {
      this.elements.error.hide();
    }
  }
}