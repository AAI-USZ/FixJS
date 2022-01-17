function() {

  presets = {};

  var options = {
    offset: 0,
    limit: 10
  };

  var load = function(options, onSuccess) {
    API.call('presets', 'get', options).on({success: onSuccess});
  };

  var add = function(data) {
    data.each(function(item) {
      presets[item.uuid] = item;
    });
  };

  View.getMain().showIndicator({stack: 'preset'});

  load(options, function(response) {
    add(response.data);

    View.getMain().push('preset', new View.Object.LoadMore({
      title: 'Presets',
      content: UI.render('preset', {preset: response.data}),
      action: {
        title: 'New',
        url: '/preset/new'
      },
      loadMoreFunction: load,
      loadMoreOptions: options,
      loadedItems: response.data.length,
      addItemsFunction: add,
      itemContainer: '.preset_container',
      templateId: 'preset-single'
    }));
  });
}