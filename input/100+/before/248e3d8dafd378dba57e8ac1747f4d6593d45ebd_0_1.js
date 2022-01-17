function saveAndReportQuickScanResults() {
        var transaction = media.db.transaction('files', 'readwrite');
        var store = transaction.objectStore('files');

        // Save the new files
        for (var i = 0; i < newfiles.length; i++) {
          var fileinfo = newfiles[i];

          // When an existing file is overwritten, we should report
          // it as a deletion followed by a creation. So for this quick
          // scan pass, we're only interested in new files, which means
          // that we need to use add() rather than put() to add to the db.
          var addRequest = store.add(fileinfo);

          addRequest.onerror = function() {
            // It probably failed because a file by that name is
            // already in the db. Don't save or report it now. We'll
            // handle it when we do a full scan.
            newfiles.splice(i, 1);  // remove the file
            i--;
          }
        }

        // Finally, call the onchange handler about the new files
        if (media.onchange)
          media.onchange('created', newfiles);
      }