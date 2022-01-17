function ($target) {
      var id = $target.attr('id'),
        dataSelector = $target.data('selector');
      if (id === undefined && dataSelector === undefined) {
        dataSelector = 'tooltip' + Math.random().toString(36).substring(7);
        $target.attr('data-selector', dataSelector);
      }
      return (id) ? id : dataSelector;
    }