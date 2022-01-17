function(response) {
    add(response.data);

    View.getMain().push('production', new View.Object.LoadMore({
      title: 'Productions',
      content: UI.render('production', {production: response.data}),
      action: {
        title: 'New',
        url: '/production/source'
      },
      loadMoreFunction: load,
      loadMoreOptions: options,
      loadedItems: response.data.length,
      addItemsFunction: add,
      itemContainer: '.production_container',
      templateId: 'production-single'
    }));
  }