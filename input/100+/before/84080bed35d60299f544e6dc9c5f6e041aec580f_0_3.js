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