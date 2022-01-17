function(done) {
      var dsdb = this;

      // First, scan for new files since the last scan, if there was one
      // When the quickScan is done it will begin a full scan.  If we don't
      // have a last scan date, then we just begin a full scan immediately
      if (dsdb.lastScanDate) 
        quickScan(dsdb.lastScanDate);
      else {
        dsdb.lastScanDate = new Date();
        fullScan();
      }
      
      // Do a quick scan and then follow with a full scan
      function quickScan(date) {
        var newfiles = [];

        var cursor = dsdb.storage.enumerate(dsdb.directory, {
          since: dsdb.lastScanDate
        });
        dsdb.lastScanDate = new Date();
        cursor.onsuccess = function() {
          var result = cursor.result;
          if (result)
            processNewFile(result);
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
            var fileinfo = {
              name: file.name,
              type: file.type,
              size: file.size,
              date: file.lastModifiedDate,
            };
            newfiles.push(fileinfo);
            
            if (dsdb.metadataParser) {
              dsdb.metadataParser(file, function(metadata) {
                fileinfo.metadata = metadata;
                cursor.continue();
              }, function(error) {
                console.error(error);
                cursor.continue();
              });
            }
            else {
              fileinfo.metadata = null;
              callback();
            }
          }
          catch(e) {
            console.error(e);
            cursor.continue();
          }
        }

        // Take all the file info objects we found and save them
        // to the database, then report them with the fileAdded callback
        function saveAndReportQuickScanResults() {
          var transaction = this.db.transaction('files', 'readwrite');
          var store = transaction.objectStore('files');

          // Save the new files
          for(var i = 0; i < newfiles.length; i++) {
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
          dsdb.onchange('created', newfiles);
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
        var store = this.db.transaction('files').objectStore('files');
        var getAllRequest = store.getAll();

        getAllRequest.onsuccess = function() {
          var dbfiles = getAllRequest.result;  // Should already be sorted

          // Now get all the files in device storage
          var cursor = dsdb.storage.enumerate(dsdb.directory);
          var dsfiles = [];
          cursor.onsuccess = function() {
            var file = cursor.result;
            if (file) {
              // XXX: should I just save the file here?
              dsfiles.push({
                name: file.name,
                type: file.type,
                size: file.size,
                date: file.lastModifiedDate
              });
            }
            else { // When no more files
              compareLists(dbfiles, dsfiles);
            }
          }
        }

        function compareLists(dbfiles, dsfiles) {
          // The dbfiles are sorted when we get them from the db.
          // But the ds files are not sorted 
          dsfiles.sort(function(a,b) {
            if (a.name < b.name) 
              return -1;
            else 
              return 1;
          });

          var deletedFiles = [];
          var createdFiles = [];

          // Loop through both the dsfiles and dbfiles lists
          var dsindex = 0, dbindex = 0;
          while(true) {
            // Get the next DeviceStorage file or null
            var dsfile
            if (dsindex < dsfiles.length)
              dsfile =  dsfiles.dsfiles[dsindex];
            else
              dsfile = null;

            // Get the next DB file or null
            var dbfile;
            if (dbindex < dbfiles.length)
              dbfile =  dbfiles.dbfiles[dbindex];
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
              if (dsfile.date !== dbfile.date || dsfile.size !== dsfile.size) {
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
            var transaction = this.db.transaction('files', 'readwrite')
            var store = transaction.objectStore('files');
            deletedFiles.forEach(function(fileinfo) {
              store.delete(fileinfo.name);
            });
            // When all the deletions are done, report the deleted files
            // And then deal with the new files
            transaction.oncomplete = function() {
              dsdb.onchange('deleted', deletedFiles);
              
              if (createdFiles.length > 1) 
                handleCreatedFiles();
            };
          }

          function handleCreatedFiles() {
            if (dsdb.metadataParser) {
              // If we've got a metadata parser, get file metadata and
              // then store the files
              getMetadataForFile(0, storeCreatedFiles);
            }
            else {
              // Otherwise, just store the files
              storeCreatedFiles();
            }
          }

          // This function gets metadata for created files n and up
          // and then calls the callback. We
          function getMetadataForFile(n, callback) {
            var fileinfo = createdFiles[n];
            var fileRequest = storage.get(fileinfo.name); 
            fileRequest.onsuccess = function() {
              var file = fileRequest.result;
              dsdb.metadataParser(file, function(metadata) {
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
            var transaction = this.db.transaction('files', 'readwrite')
            var store = transaction.objectStore('files');
            for(var i = 0; i < createdFiles.length; i++) {
              store.add(createdFiles[i]);
            }

            // Now once we're done storing the files deliver a notification
            dsdb.onchange("created", createdFiles);
          }
        }
      }
    }