function(event) {
      event.bubbles = false;
      event.stopPropagation();
    if (event.keyCode == 13) {
      finish();
    }
  }