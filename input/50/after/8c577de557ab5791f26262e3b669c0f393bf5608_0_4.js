function(error, thumbName) {
              if (error) {
                throw error;
              }
              else {
               // Move file completed.  Can now generate thumbnail.
                socket.emit('done', {'image' : 'files/' + thumbName});
                // Upload fully complete. Destroy MovieFile object for this file.
                delete files[machineName];
              }
            }