function(fileEntry) {
                 fileEntry.createWriter(function(fileWriter) {
                    fileWriter.onwriteend = function(e) {
                      that.hasstl = true;
                      that.downloadStlLink.href = fileEntry.toURL();
                      that.downloadStlLink.type="application/sla";
                      that.enableItems();
                      if(that.onchange) that.onchange();
                    };
                    fileWriter.onerror = function(e) {
                      throw new Error('Write failed: ' + e.toString());
                    };
                    // Create a new Blob and write it to log.txt.
                    var bb=OpenJsCad.getBlobBuilder();    
                    that.solid.toStlBinary(bb);
                    // bb.append(stltxt);
                    var blob=bb.getBlob("application/sla");
                    fileWriter.write(blob);                
                  }, 
                  function(fileerror){OpenJsCad.FileSystemApiErrorHandler(fileerror, "createWriter");} 
                );
              }