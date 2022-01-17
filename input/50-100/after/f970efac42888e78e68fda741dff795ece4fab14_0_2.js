function(ev) {
    //Check if the dropdown is visible to hiding with the click on the target
    if(ev){
      ev.preventDefault();
      ev.stopPropagation();
    }
    // If visible
    if (this.isOpen){
      this.hide();
    }else{
      this.open();
    }
    this.isOpen = !this.isOpen;
  }