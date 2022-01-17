function collapseProjectTree(id) {
  $$('table.list tr.child.' + id).each(function(e) {
    e.addClassName('hide');
    collapseProjectTree(e.identify());
  })
}