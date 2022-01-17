function(test) {
  var childWithTag = function(node, tag) {
    return _.find(node.childNodes, function(n) {
      return n.nodeName === tag;
    });
  };

  var table;

  table = childWithTag(Meteor.ui.render(Template.test_table_a0), "TABLE");

  // table.rows is a great test, as it fails not only when TR/TD tags are
  // stripped due to improper html-to-fragment, but also when they are present
  // but don't show up because we didn't create a TBODY for IE.
  test.equal(table.rows.length, 3);

  // this time with an explicit TBODY
  table = childWithTag(Meteor.ui.render(Template.test_table_b0), "TABLE");
  test.equal(table.rows.length, 3);

  var c = new LocalCollection();
  c.insert({bar:'a'});
  c.insert({bar:'b'});
  c.insert({bar:'c'});
  var onscreen = DIV({style: "display: none;"});
  onscreen.appendChild(
    Meteor.ui.render(_.bind(Template.test_table_each, null, {foo: c.find()})));
  document.body.appendChild(onscreen);
  table = childWithTag(onscreen, "TABLE");

  test.equal(table.rows.length, 3, table.parentNode.innerHTML);
  var tds = onscreen.getElementsByTagName("TD");
  test.equal(tds.length, 3);
  test.equal(tds[0].innerHTML, "a");
  test.equal(tds[1].innerHTML, "b");
  test.equal(tds[2].innerHTML, "c");


  document.body.removeChild(onscreen);
}