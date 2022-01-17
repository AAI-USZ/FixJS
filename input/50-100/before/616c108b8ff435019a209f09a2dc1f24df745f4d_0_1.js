function toggleOddEven()
{
  var isEven = false;

  $$('table.list tr.project').each(function(e) {
    if (!e.hasClassName('hide')) {
      e.removeClassName('odd');
      e.removeClassName('even');
      e.addClassName(isEven ? 'even' : 'odd');
      isEven = !isEven;
    }
  })
}