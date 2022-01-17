function() {
        var collection = this.getParent();
        if (collection) {
          var mapId = collection.elements.getMap().container.getElement().parentElement.id;
          var polygons = collection.export();
          var $storage = $('.field-yamaps-polygons-' + mapId);
          $storage.val(JSON.stringify(polygons));
        }
      }