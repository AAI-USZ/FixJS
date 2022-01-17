function() {
            if(typeof(chrome.extension.lastError) != 'undefined') {
              // there was an error in saving
              if (chrome.extension.lastError.message == "Quota exceeded") {
                // got a quota exceeded error, delete any saves in progress and try again
                var deleteObject = [];
                for (var j = 0; j < savedKeys.length; j++){
                  deleteObject.push(savedKeys[j]);
                }

                if (!$.isEmptyObject(deleteObject)) {
                  chrome.storage.sync.remove(deleteObject, function() {
                    attemptSave(numSerialize + 1);
                  })
                }
              }
            }
            else {
              // success in saving
              savedKeys.push(splitKey);
              if (savedKeys.length == numSerialize) {
                // we're done here
                bank.checkQuota();
                callback();
              }
            }
          }