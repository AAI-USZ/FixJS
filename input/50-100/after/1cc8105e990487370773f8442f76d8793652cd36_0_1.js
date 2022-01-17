function (data, status)
              {
                  var fileURL = $(data).find('file_url').text();
                  var error = $(data).find('error').text();
                  if(error != ''){
                    alert(error);
                  }else{
                    if(fileURL == ''){
                  	  alert("There was an internal server error uploading your file.\nPermission denied.");
                  	}
                  	else{
                      imageUrl.attr('value', appUrl + fileURL);
                   }
                  }

              }