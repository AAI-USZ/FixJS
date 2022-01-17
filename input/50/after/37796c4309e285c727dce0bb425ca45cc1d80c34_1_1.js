function(event) {
          var type = event.get('newType');
          var $storage = $('.field-yamaps-type-' + mapId);
          $storage.val(type);
        }