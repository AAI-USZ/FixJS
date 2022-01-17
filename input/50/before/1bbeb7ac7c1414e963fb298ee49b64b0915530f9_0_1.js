function (event) {
    event.preventDefault();
    event.stopPropagation();
    
    toggleCheckbox($(this));
  }