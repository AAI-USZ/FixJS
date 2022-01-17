function(req) {
  var production = Data.prepare(productions[req.uuid], 'production');

  UI.register('a.startProduction', function(elements) {
    elements.addEvent('click', click);
  });

  addPlaceholder();

  View.getMain().push('production', new View.Object({
    title: production.metadata.title,
    content: UI.render('data-detail', production),
    action: {
      title: 'Edit',
      url: '/production/edit/' + production.uuid
    }
  }));
}