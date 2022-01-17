function() {
        var collection = this.getParent();
        if (collection) {
          var placemarks = collection.export();
          var $storage = $('.field-yamaps-placemarks');
          $storage.val(JSON.stringify(placemarks));
        }
      }