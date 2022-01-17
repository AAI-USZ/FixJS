function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.Grid({
    model: dataset
  });
  $('.fixtures .test-datatable').append(view.el);
  view.render();

  assertPresent('.column-header[data-field="x"]');
  var hideColumn = view.el.find('.column-header[data-field="x"] a[data-action="hideColumn"]');
  hideColumn.trigger('click');
  assertNotPresent('.column-header[data-field="x"]', view.el);

  // also test a bit of state
  deepEqual(view.state.toJSON(), {hiddenFields: ['x']});
  view.remove();
}