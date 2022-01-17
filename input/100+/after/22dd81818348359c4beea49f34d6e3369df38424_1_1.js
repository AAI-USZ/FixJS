function () {
  var dataset = Fixture.getDataset();
  var view = new recline.View.Grid({
    model: dataset,
    state: {
      hiddenFields: ['z']
    }
  });
  $('.fixtures .test-datatable').append(view.el);
  view.render();
  assertPresent('.column-header[data-field="x"]');
  assertNotPresent('.column-header[data-field="z"]');
  view.remove();
}