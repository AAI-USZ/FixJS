function(transport) {
        if (transport.responseText.isJSON()) {
          var json = transport.responseText.evalJSON();
          loadAttachmentListCallback(json, true, false);
          callbackFnkt(json.length == stepNumber, scroll);
        if ((typeof console != 'undefined') && (typeof console.log != 'undefined')) {
          console.log('loadAttachmentList: total loaded [',
              $$('.imagePickerSource').size() ,'] finished? ',
              (json.length == stepNumber));
        }
        } else if ((typeof console != 'undefined') 
            && (typeof console.warn != 'undefined')) {
          console.warn('loadAttachmentList: noJSON!!! ', transport.responseText);
        }
      }