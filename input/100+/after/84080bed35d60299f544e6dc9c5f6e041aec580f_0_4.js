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
              dsfile = dsfiles.dsfiles[dsindex];
            else
              dsfile = null;

            // Get the next DB file or null
            var dbfile;
            if (dbindex < dbfiles.length)
              dbfile = dbfiles.dbfiles[dbindex];
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
            var transaction = this.db.transaction('files', 'readwrite');
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
            var transaction = this.db.transaction('files', 'readwrite');
            var store = transaction.objectStore('files');
            for (var i = 0; i < createdFiles.length; i++) {
              store.add(createdFiles[i]);
            }

            // Now once we're done storing the files deliver a notification
            dsdb.onchange('created', createdFiles);
          }
        }