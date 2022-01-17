function(prefix, id, callback) {
    var bank = Tapedeck.Backend.Bank;

    if (bank.isSyncOn()) {
      var key = prefix + id;
      var nextCount = 0;
      chrome.storage.sync.get(null, function(allKeys) {

        var removePiece = function(removeKey) {
          console.log("removing " + removeKey + " in clearList");
          chrome.storage.sync.remove(removeKey, function() {
            // see if another piece exists
            var nextKey = bank.splitListContinuePrefix + id + "@" + nextCount;
            nextCount++;
            if (nextKey in allKeys && typeof(chrome.extension.lastError) == "undefined") {
              removePiece(nextKey);
            }
            else {
              // got some error, likely we ran out of keys
              if (typeof(callback) != "undefined") {
                callback();
              }
            }
          });
        }

        if (key in allKeys) {
          removePiece(key);
        }
      }); // end chrome.storage.get(null, ...
    }
    else {
      // TODO decide if we need to do anything here for the non-Sync case
    }
  }