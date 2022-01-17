function fullScan() {
      media.lastScanTime = Date.now();
      localStorage[media.dbname + '.lastScanTime'] = media.lastScanTime;

      var store = media.db.transaction('files').objectStore('files');
      var getAllRequest = store.mozGetAll();

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
          var isComplete = function() {
            if (n === createdFiles.length) { // if we're done
              callback();
            } else { // Otherwise get the next one
              getMetadataForFile(n, callback);
            }
          }
          fileRequest.onsuccess = function() {
            var file = fileRequest.result;
            media.metadataParser(file, function parser_success(metadata) {
              fileinfo.metadata = metadata;
              n++;
              isComplete();
            }, function parser_error() {
              n++;
              isComplete();
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