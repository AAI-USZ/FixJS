function(start, end) {
        var $storage = $('.field-yamaps-routes');
        if (!start || !end) {
          $storage.val('');
        }
        else {
          $storage.val(JSON.stringify([start, end]));
        }
      }