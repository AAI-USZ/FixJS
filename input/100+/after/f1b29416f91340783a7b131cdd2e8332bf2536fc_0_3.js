function(numSerialize) {
        if (typeof(numSerialize) == "undefined") {
          numSerialize = 1;
        }
        if (numSerialize > bank.MAX_NUMBER_SPLITS) {
          // Don't do splits this large, just give up
          console.error("Won't split playlist into " + numSerialize + " parts for saving.  Playlist is too large.")

          Tapedeck.Backend.MessageHandler.showModal({
            fields: [
              { type          : "info",
                text          : "One of your playlists is too long to save and sync."},
              { type          : "info",
                text          : "Consider turning off syncing." },
            ],
            title: "Cassettify Wizard",
          });
          return;
        }

        // return numSerialize number of strings to save for this one playlist
        var savedKeys = [];
        var serialized = list.serialize(numSerialize);

        // loop through once quickly to see if any of the serialized pieces will be too big
        for (var i = 0; i < serialized.length; i++) {
          if (serialized[i].length > bank.MAX_SYNC_STRING_SIZE) {
            attemptSave(numSerialize + 1);
            return;
          }
        }

        for (var i = 0; i < serialized.length; i++) {
          // the first entry will have the original key, each entry then points to the next
          var splitKey;
          if (i == 0) {
            splitKey = prefix + id;
          }
          else {
            splitKey = bank.splitListContinuePrefix + id + "@" + (i-1);
          }

          var save = {}
          save[splitKey] = serialized[i];
          chrome.storage.sync.set(save, function() {
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
          })
        }
      }