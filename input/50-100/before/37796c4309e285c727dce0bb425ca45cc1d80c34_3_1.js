function() {
        var collection = this.getParent();
        if (collection) {
          var polygons = collection.export();
          var $storage = $('.field-yamaps-polygons');
          $storage.val(JSON.stringify(polygons));
        }
      }