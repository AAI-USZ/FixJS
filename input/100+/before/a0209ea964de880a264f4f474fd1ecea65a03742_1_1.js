function(item) {
              // Check if stream is paused
              test.equal(false, stream.paused);
              // Pause stream
              stream.pause();
              // Check if cursor is paused
              test.equal(true, stream.paused);         

              // Restart the stream after 1 miliscecond
              setTimeout(function() {
                stream.resume();
                // Check if cursor is paused
                test.equal(false, stream.paused);
              }, 1);          
            }