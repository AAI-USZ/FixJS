function(isSelected){
  if (this.isSelected !== isSelected) {
    this.isSelected = isSelected;
    this.updateStyle();
    $(this.node).trigger('selected', [isSelected]);
  }
}