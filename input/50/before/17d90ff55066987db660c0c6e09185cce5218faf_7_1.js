function(e) {
    // If there is a previous highlit element, remove its borders
    if (this.highlit_element) {
      resetBorder({
        target: highlit_element
      });
    }
    this.highlit_element = e.target;
    e.target.style.outline = '1px solid #003366';
  }