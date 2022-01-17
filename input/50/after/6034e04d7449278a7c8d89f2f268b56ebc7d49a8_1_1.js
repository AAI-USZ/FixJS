function(){
    this.isOpen = false;
    this.popover.dispose();

    // Restore previous settings
    if (this.toggledTo) {
      this.toggle(this.toggledTo == 'bottom' ? 'top' : 'bottom');
      this.toggledTo = null;
    }
  }