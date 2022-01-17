function() {
  var $element = this.$element;
  $element.children('input').trigger('focus');
  window.setTimeout(function() { $element.removeClass('pp-table-view-selected-state'); }, 100);
}