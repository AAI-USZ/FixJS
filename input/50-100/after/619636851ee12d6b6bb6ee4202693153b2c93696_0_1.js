function(buffer) {
               if (!buffer) {
                   return console.error('Error decoding file:', path);
               }
               var cbArray = buffers[path];
               buffers[path] = {buffer: buffer};
               for (var i=0; i < cbArray.length; i++) {
                   cbArray[i](buffer, path);
               }
            }, function(e){console.error('Error decoding file',e);}