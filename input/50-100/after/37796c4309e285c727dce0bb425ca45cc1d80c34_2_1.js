function() {
        var collection = this.getParent();
        if (collection) {
          var mapId = collection.elements.getMap().container.getElement().parentElement.id;
          var placemarks = collection.export();
          var $storage = $('.field-yamaps-placemarks-' + mapId);
          $storage.val(JSON.stringify(placemarks));
        }
      }