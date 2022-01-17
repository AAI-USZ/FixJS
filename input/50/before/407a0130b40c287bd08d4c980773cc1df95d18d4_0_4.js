function TextAreaInputTableViewCell(reuseIdentifier) {
  
  // Call the "super" constructor.
  Pushpop.TableViewCell.prototype.constructor.apply(this, arguments);
  
  var self = this, $element = this.$element;
  
  // Assign a CSS class to this cell to add specific styles to it.
  $element.addClass('pp-text-area-input-table-view-cell');
}