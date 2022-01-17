function () {
  var $el = $('<tr />');
  $('.fixtures .test-datatable').append($el);
  var doc = new recline.Model.Record({
    'id': 1,
    'b': '2',
    'a': '1'
    });
  var view = new recline.View.GridRow({
    model: doc
    , el: $el
    , fields: new recline.Model.FieldList([{id: 'a'}, {id: 'b'}])
  });
  view.render();
  ok($el.attr('data-id'), '1');
  var tds = $el.find('td');
  equal(tds.length, 2);
  equal($(tds[0]).attr('data-field'), 'a');
  view.remove();
}