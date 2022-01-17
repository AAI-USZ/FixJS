function(error) {
          // Delete temp media file.
          fs.unlink("temp/" + machineName, function (error) { 
            // Mark file in database as permanent.
            files[machineName].setPermanent(true);
            files[machineName].update(function(error, success) {
              if (error) {
                throw error;
              }
              console.log('Record successfully updated.');
            });
            // Create thumbnails.
            var options = {
              path: '/static/files',
              dimensions: '300x?'
            };
            files[machineName].createThumbnail(options, function(error, thumbName) {
              if (error) {
                throw error;
              }
              else {
             // Move file completed.  Can now generate thumbnail.
                socket.emit('done', {'image' : 'files/' + thumbName});
              }
            });
            
          });
        }