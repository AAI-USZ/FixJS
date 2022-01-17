function(sources) {
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
    }