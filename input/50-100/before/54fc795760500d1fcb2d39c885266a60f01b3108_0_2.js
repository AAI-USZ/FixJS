function(value) {
  
  // Call the "super" method.
  Pushpop.TableViewCell.prototype.setSelected.apply(this, arguments);
  
  var $element = this.$element;
  
  if (value) {
    $element.children('input').focus();
    window.setTimeout(function() { $element.removeClass('pp-table-view-selected-state'); }, 100);
  } else {
    $element.children('input').blur();
  }
}