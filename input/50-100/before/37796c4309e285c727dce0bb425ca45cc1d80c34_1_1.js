function(event) {
          var coords = {
            //bounds: event.get('newBounds'),
            center: event.get('newCenter'),
            zoom: event.get('newZoom')
          };
          var $storage = $('.field-yamaps-coords');
          $storage.val(JSON.stringify(coords));
        }