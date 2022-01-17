function storeCreatedFiles() {
            var transaction = this.db.transaction('files', 'readwrite');
            var store = transaction.objectStore('files');
            for (var i = 0; i < createdFiles.length; i++) {
              store.add(createdFiles[i]);
            }

            // Now once we're done storing the files deliver a notification
            dsdb.onchange('created', createdFiles);
          }