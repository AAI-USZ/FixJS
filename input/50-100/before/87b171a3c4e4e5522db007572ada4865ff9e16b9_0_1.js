function(transport) {
          if (transport.responseText.isJSON()) {
            var json = transport.responseText.evalJSON();
            loadAttachmentListCallback(json, false, true);
          } else if ((typeof console != 'undefined') 
              && (typeof console.debug != 'undefined')) {
            console.debug('loadSlideShowDataAsync: noJSON!!! ', transport.responseText);
          }
        }