function (data, status)
              {
                  var fileURL = $(data).find('file_url').text();
                  var error = $(data).find('error').text();
                  if(error != ''){
                    alert(error);
                  }else{
                    imageUrl.attr('value', appUrl + fileURL);
                  }

              }