function getNext() {
            if (index === files.length) return done();
            var file = files[index++];
            var fullpath = join(path, file);

            if (stat.access & 1/*EXEC/SEARCH*/) { // Can they enter the directory?
              createStatEntry(file, fullpath, onStatEntry);
            }
            else {
              var err = new Error("EACCESS: Permission Denied");
              err.code = "EACCESS";
              onStatEntry({
                name: file,
                err: err
              });
            }
            function onStatEntry(entry) {
              stream.emit("data", entry);

              if (!paused) {
                getNext();
              }
            }
          }