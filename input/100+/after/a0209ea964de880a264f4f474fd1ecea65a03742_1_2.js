function(err, result) {
          // Let's create a read file
          file = new GridStore(db, fileId, "r");

          // Open the file
          file.open(function(err, file) {            
            // Peform a find to get a cursor
            var stream = file.stream(true);

            // Pause the stream initially
            stream.pause();

            // Save read content here
            var fileBuffer = '';

            // For each data item
            stream.on("data", function(item) {
              // Check if stream is paused
              test.equal(false, stream.paused);
              // Pause stream
              stream.pause();
              // Check if cursor is paused
              test.equal(true, stream.paused);         

              fileBuffer += item.toString('utf8');

              // Restart the stream after 1 miliscecond
              setTimeout(function() {
                stream.resume();
                // Check if cursor is paused
                test.equal(false, stream.paused);
              }, 1);          

            });

            // For each data item
            stream.on("end", function(item) {});
            // When the stream is done
            stream.on("close", function() {
              // Have we received the same file back?
              test.equal(fileBuffer, fileBody);
              db.close();
              test.done();          
            });        

            // Resume the stream
            stream.resume();
          });
        }