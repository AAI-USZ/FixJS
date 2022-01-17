function() {

  productions = {};

  var options = {
    offset: 0,
    limit: 20
  };

  var load = function(options, onSuccess) {
    API.call('productions', 'get', options).on({success: onSuccess});
  };

  var add = function(data) {
    data.each(function(item) {
      productions[item.uuid] = item;
    });
  };

  View.getMain().showIndicator({stack: 'production'});

  load(options, function(response) {
    Source.fetch(function(sources) {
      add(response.data);

      View.getMain().push('production', new View.Object.LoadMore({
        title: 'Productions',
        content: UI.render('production', {production: response.data}),
        action: {
          title: 'New',
          // If there are no services we skip the service chooser interface
          url: (sources && sources.length ? '/production/source' : '/record')
        },
        loadMoreFunction: load,
        loadMoreOptions: options,
        loadedItems: response.data.length,
        addItemsFunction: add,
        itemContainer: '.production_container',
        templateId: 'production-single'
      }));
    });
  });

}