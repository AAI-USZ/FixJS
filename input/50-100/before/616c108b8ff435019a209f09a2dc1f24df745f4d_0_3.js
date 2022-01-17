function collapseAll()
{
  $$('table.list tr.project').each(function(e) {
    e.removeClassName('open');
    e.addClassName('closed');
    if (!e.hasClassName('root')) {
      e.addClassName('hide');
    }
  });

  toggleOddEven();
}