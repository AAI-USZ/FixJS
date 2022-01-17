function(isSelected){
  if (this.isSelected !== isSelected) {
    this.isSelected = isSelected;
    this.updateStyle();
  }
}