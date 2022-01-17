function(transport) {
        if (transport.responseText.isJSON()) {
          initSlideShows(transport.responseText.evalJSON());
          startSlideShows();
        } else if ((typeof console != 'undefined')
            && (typeof console.warn != 'undefined')) {
          console.warn('loadSlideShowDataAsync: noJSON!!! ', transport.responseText);
        }
      }