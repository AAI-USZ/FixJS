function(start, end) {
        var mapId = Map.map.container.getElement().parentElement.id;
        var $storage = $('.field-yamaps-routes-' + mapId);
        if (!start || !end) {
          $storage.val('');
        }
        else {
          $storage.val(JSON.stringify([start, end]));
        }
      }