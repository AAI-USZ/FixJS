function(data){
            dayContent += '<div class="post">'
                            + '<h3>' + entryTitle + '<h3>'
                            + '<div class="post-content">' + data + '</div>'
                          + '</div>';
            requestHandler.removeCall(dayContent);
          }