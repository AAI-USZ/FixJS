function toggleOddEven() {
  var isEven = false;

  $$('table.list tr.project:not(.hide)').each(function(e) {
    e.removeClassName('odd');
    e.removeClassName('even');
    e.addClassName(isEven ? 'even' : 'odd');
    isEven = !isEven;
  })
}