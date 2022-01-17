function InlineTextInputTableViewCell(reuseIdentifier) {
  
  // Call the "super" constructor.
  Pushpop.TableViewCell.prototype.constructor.apply(this, arguments);
  
  var self = this, $element = this.$element;
  
  // Assign a CSS class to this cell to add specific styles to it.
  $element.addClass('pp-inline-text-input-table-view-cell');
  
  // Attach an event handler to this cell to update its value when the input changes.
  $element.delegate('input', 'keyup change', function(evt) {
    var data = self.getData();
    var value = $(this).val();
    if (data) data.value = value;
    this._value = value;
  });
}