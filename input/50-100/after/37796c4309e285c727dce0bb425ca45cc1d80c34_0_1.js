function() {
        var collection = this.getParent();
        if (collection) {
          var mapId = collection.elements.getMap().container.getElement().parentElement.id;
          var lines = collection.export();
          var $storage = $('.field-yamaps-lines-' + mapId);
          $storage.val(JSON.stringify(lines));
        }
      }