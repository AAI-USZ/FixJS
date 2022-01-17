function quickScan(date) {
      var newfiles = [];

      var cursor = media.storage.enumerate(media.directory, {
        since: new Date(date)
      });

      cursor.onsuccess = function() {
        var result = cursor.result;
        if (result) {
          processNewFile(result);
        }
        else {// When no more files
          if (newfiles.length > 0) {
            // report new files we found, then do a full scan
            saveAndReportQuickScanResults(fullScan); 
          }
          else {
            // If we didn't find any new files, go direct to the full scan
            fullScan();                         // do full scan
          }
        }
      }

      // We found a new file in device storage.
      // Extract its metadata and remember it.
      // (Don't store it in the db yet)
      // Then call cursor.continue to move on to the next file
      function processNewFile(file) {
        try {
          // Skip the file if it isn't the right type
          if (media.mimeTypes && media.mimeTypes.indexOf(file.type) === -1) {
            cursor.continue();
            return;
          }

          var fileinfo = {
            name: file.name,
            type: file.type,
            size: file.size,
            date: file.lastModifiedDate.getTime()
          };
          newfiles.push(fileinfo);

          media.metadataParser(file, function(metadata) {
            fileinfo.metadata = metadata;
            cursor.continue();
          }, function(error) {
            console.error(error);
            cursor.continue();
          });
        }
        catch (e) {
          console.error(e);
          cursor.continue();
        }
      }

      // Take all the file info objects we found and save them
      // to the database, then report them with the fileAdded callback
      // And finally, call the next() function to continue with a full scan
      function saveAndReportQuickScanResults(next) {
        var transaction = media.db.transaction('files', 'readwrite');
        var store = transaction.objectStore('files');
        var numSaved = 0;
        var errors = [];

        // Save the new files
        for (var i = 0; i < newfiles.length; i++) {
          saveFile(i);
        }

        function saveFile(i) {
          // When an existing file is overwritten, we should report
          // it as a deletion followed by a creation. So for this quick
          // scan pass, we're only interested in new files, which means
          // that we need to use add() rather than put() to add to the db.
          var addRequest = store.add(newfiles[i]);

          addRequest.onerror = function(e) {
            // It probably failed because a file by that name is
            // already in the db. Don't save or report it now. We'll
            // handle it when we do a full scan.
            errors.push(i);

            // don't let it bubble up to the DB error handler
            e.stopPropagation(); 

            if (++numSaved === newfiles.length)
              report();
          };

          addRequest.onsuccess = function() {
            if (++numSaved === newfiles.length)
              report();
          };
        }

        function report() {
          // If there were errors saving any of the files, it was because
          // those files were already in the db. That means they're changed
          // files not new files, and we'll report them later.
          // Carefully remove those new files, taking care about the
          // shifting indexes
          if (errors.length > 0) {
            errors.forEach(function(i) { newfiles[errors[i]] = null; });
            newfiles = newfiles.filter(function(f) { return f != null; });
          }

          // Finally, call the onchange handler about the new files
          // if there are any
          if (newfiles.length > 0 && media.onchange)
            media.onchange('created', newfiles);

          // Finally, move on to the next thing
          next();
        }
      }
    }