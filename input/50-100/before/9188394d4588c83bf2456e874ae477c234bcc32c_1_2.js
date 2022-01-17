function(event) {
      var place = event.target.result;
      if (place) {
        if (callback)
          callback();
        return;
      } else {
        place = {
          uri: uri,
          title: uri,
          frecency: 0
        };
      }

      var writeRequest = objectStore.add(place);

      writeRequest.onsuccess = function onsucess(event) {
        if (callback)
          callback();
      };

      writeRequest.onerror = function onerror(event) {
        console.log('error writing place');
      };
    }