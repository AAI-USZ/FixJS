function(transport) {
          if (transport.responseText.isJSON()) {
            var json = transport.responseText.evalJSON();
            loadAttachmentListCallback(json, false, true);
          } else if ((typeof console != 'undefined') 
              && (typeof console.warn != 'undefined')) {
            console.warn('pickerUploadFinshed: noJSON!!! ', transport.responseText);
          }
        }