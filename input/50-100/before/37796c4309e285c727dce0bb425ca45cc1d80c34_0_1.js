function() {
        var collection = this.getParent();
        if (collection) {
          var lines = collection.export();
          var $storage = $('.field-yamaps-lines');
          $storage.val(JSON.stringify(lines));
        }
      }