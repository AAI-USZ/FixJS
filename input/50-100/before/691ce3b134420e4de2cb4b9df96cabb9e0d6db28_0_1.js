function(transport) {
        if (transport.responseText.isJSON()) {
          initSlideShows(transport.responseText.evalJSON());
          startSlideShows();
        } else if ((typeof console != 'undefined')
            && (typeof console.debug != 'undefined')) {
          console.debug('loadSlideShowDataAsync: noJSON!!! ', transport.responseText);
        }
      }