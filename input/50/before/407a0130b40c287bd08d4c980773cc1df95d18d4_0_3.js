function Value2TableViewCell(reuseIdentifier) {
  
  // Call the "super" constructor.
  Pushpop.TableViewCell.prototype.constructor.apply(this, arguments);
  
  // Assign a CSS class to this cell to add specific styles to it.
  this.$element.addClass('pp-value2-table-view-cell');
}