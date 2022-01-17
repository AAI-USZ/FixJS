function (data, status)
              {
                  var fileURL = $(data).find('file_url').text();
                  /*
                   * hopefully a fix for the "fakepath" issue
                   * https://www.mediawiki.org/wiki/Special:Code/MediaWiki/83225
                   */
                  fileURL = fileURL.replace(/\w:.*\\(.*)$/,'$1');
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