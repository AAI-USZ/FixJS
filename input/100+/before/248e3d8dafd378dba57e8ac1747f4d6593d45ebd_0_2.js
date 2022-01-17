function() {
    if (!this.db)
      throw Error('MediaDB is not ready yet. Use the onready callback');

    var media = this;

    // First, scan for new files since the last scan, if there was one
    // When the quickScan is done it will begin a full scan.  If we don't
    // have a last scan date, then we just begin a full scan immediately
    if (media.lastScanTime)
      quickScan(media.lastScanTime);
    else {
      fullScan();
    }

    // Do a quick scan and then follow with a full scan
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
          if (newfiles.length > 0)
            saveAndReportQuickScanResults();  // report new files we found
          fullScan();                         // do full scan
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
    }

    // Get a complete list of files from DeviceStorage
    // Get a complete list of files from IndexedDB.
    // Sort them both (the indexedDB list may already be sorted)
    // Step through the lists noting deleted files and created files.
    // Pay attention to files whose size or date has changed and
    // treat those as deletions followed by insertions.
    // Sync up the database while stepping through the lists and
    // then call the onchange handler to report deleted files and
    // created files.  (Report deleted files first because we model
    // file changes as deletions followed by creations)
    function fullScan() {
      media.lastScanTime = Date.now();
      localStorage[media.dbname + '.lastScanTime'] = media.lastScanTime;

      var store = media.db.transaction('files').objectStore('files');
      var getAllRequest = store.getAll();

      getAllRequest.onsuccess = function() {
        var dbfiles = getAllRequest.result;  // Should already be sorted

        // Now get all the files in device storage
        var dsfiles = [];
        var cursor = media.storage.enumerate(media.directory);

        cursor.onsuccess = function() {
          var file = cursor.result;
          if (file) {
            if (!media.mimeTypes || media.mimeTypes.indexOf(file.type) !== -1) {
              dsfiles.push({
                name: file.name,
                type: file.type,
                size: file.size,
                date: file.lastModifiedDate.getTime()
              });
            }
            cursor.continue();
          }
          else { // When no more files
            compareLists(dbfiles, dsfiles);
          }
        }
      }

      function compareLists(dbfiles, dsfiles) {
        // The dbfiles are sorted when we get them from the db.
        // But the ds files are not sorted
        dsfiles.sort(function(a, b) {
          if (a.name < b.name)
            return -1;
          else
            return 1;
        });

        var deletedFiles = [];
        var createdFiles = [];

        // Loop through both the dsfiles and dbfiles lists
        var dsindex = 0, dbindex = 0;
        while (true) {
          // Get the next DeviceStorage file or null
          var dsfile;
          if (dsindex < dsfiles.length)
            dsfile = dsfiles[dsindex];
          else
            dsfile = null;

          // Get the next DB file or null
          var dbfile;
          if (dbindex < dbfiles.length)
            dbfile = dbfiles[dbindex];
          else
            dbfile = null;

          // Case 1: both files are null.  If so, we're done.
          if (dsfile === null && dbfile === null)
            break;

          // Case 2: no more files in the db.  This means that
          // the file from ds is a new one
          if (dbfile === null) {
            createdFiles.push(dsfile);
            dsindex++;
            continue;
          }

          // Case 3: no more files in ds. This means that the db file
          // has been deleted
          if (dsfile === null) {
            deletedFiles.push(dbfile);
            dbindex++;
            continue;
          }

          // Case 4: two files with the same name.
          // 4a: date and size are the same for both: do nothing
          // 4b: file has changed: it is both a deletion and a creation
          if (dsfile.name === dbfile.name) {
            if (dsfile.date !== dbfile.date || dsfile.size !== dbfile.size) {
              deletedFiles.push(dbfile);
              createdFiles.push(dsfile);
            }
            dsindex++;
            dbindex++;
            continue;
          }

          // Case 5: the dsfile name is less than the dbfile name.
          // This means that the dsfile is new.  Like case 2
          if (dsfile.name < dbfile.name) {
            createdFiles.push(dsfile);
            dsindex++;
            continue;
          }

          // Case 6: the dsfile name is greater than the dbfile name.
          // this means that the dbfile no longer exists on disk
          if (dsfile.name > dbfile.name) {
            deletedFiles.push(dbfile);
            dbindex++;
            continue;
          }

          // That should be an exhaustive set of possiblities
          // and we should never reach this point.
          console.error('Assertion failed');
        }

        // Deal with the deleted files first
        if (deletedFiles.length > 0) {
          var transaction = media.db.transaction('files', 'readwrite');
          var store = transaction.objectStore('files');
          deletedFiles.forEach(function(fileinfo) {
            store.delete(fileinfo.name);
          });
          // When all the deletions are done, report the deleted files
          // And then deal with the new files
          transaction.oncomplete = function() {
            if (media.onchange)
              media.onchange('deleted', deletedFiles);

            if (createdFiles.length > 0)
              handleCreatedFiles();
          };
        }
        else if (createdFiles.length > 0) {
          // If there were no deleted files, we still need to
          // handle the created ones.  Especially for first-run
          handleCreatedFiles();
        }

        function handleCreatedFiles() {
          // Get file metadata and then store the files
          getMetadataForFile(0, storeCreatedFiles);
        }

        // This function gets metadata for created files n and up
        // and then calls the callback. We
        function getMetadataForFile(n, callback) {
          var fileinfo = createdFiles[n];
          var fileRequest = media.storage.get(fileinfo.name);
          fileRequest.onsuccess = function() {
            var file = fileRequest.result;
            media.metadataParser(file, function(metadata) {
              fileinfo.metadata = metadata;
              n++;
              if (n === createdFiles.length) // if we're done
                callback();
              else  // Otherwise get the next one
                getMetadataForFile(n, callback);
            });
          }
        }

        function storeCreatedFiles() {
          var transaction = media.db.transaction('files', 'readwrite');
          var store = transaction.objectStore('files');
          for (var i = 0; i < createdFiles.length; i++) {
            store.add(createdFiles[i]).onerror = function(e) {
              // XXX: 6/22: this is failing AbortError on otoro
              console.error(e.target.error.name + ' while storing fileinfo');
              e.stopPropagation();
            };
          }

          // Now once we're done storing the files deliver a notification
          if (media.onchange)
            media.onchange('created', createdFiles);
        }
      }
    }
  }