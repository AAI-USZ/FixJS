function (error) { 
            // Mark file in database as permanent.
            files[machineName].setPermanent(true);
            files[machineName].update(function(error, success) {
              if (error) {
                throw error;
              }
            });
            // Create thumbnails.
            var options = {
              path: '/static/files',
              dimensions: '200x?'
            };
            files[machineName].createThumbnail(options, function(error, thumbName) {
              if (error) {
                throw error;
              }
              else {
               // Move file completed.  Can now generate thumbnail.
                socket.emit('done', {'image' : 'files/' + thumbName});
                // Upload fully complete. Destroy MovieFile object for this file.
                delete files[machineName];
              }
            });
            
          }