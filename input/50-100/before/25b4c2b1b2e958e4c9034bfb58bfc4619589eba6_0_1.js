function (data, status)
              {
                  var fileURL = $(data).find('file_url').text();
                  var error = $(data).find('error').text();
                  if(error != ''){
                      alert(error);
                      if (startUploadHandler){
                        /* re-install this as the upload extension
                         * will remove the handler to prevent double uploading */
                        $('#file-upload').change(startUploadHandler);
                      }
                  }else{
                    imageUrl.attr('value', fileURL);
                  }

              }