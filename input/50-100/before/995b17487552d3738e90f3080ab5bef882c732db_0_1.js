function toggleRowGroup(el) {
  var tr = $(el).closest('tr');
  var n = tr.next();
  tr.toggleClass('open');
  while (n.length > 0 && !n.hasClass('group')) {
    n.toggle();
    n = n.next();
  }
}