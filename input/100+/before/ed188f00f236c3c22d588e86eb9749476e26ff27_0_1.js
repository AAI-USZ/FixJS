function(file) {
                          $.log("file:"+file.substringBeforeLast("/")+',classifier:'+classifier);
                          var fileContentUrl = "restServices/archivaServices/browseService/artifactContentText/"+encodeURIComponent(self.groupId);
                          fileContentUrl+="/"+encodeURIComponent(self.artifactId)+"/"+encodeURIComponent(self.version);
                          fileContentUrl+="?repositoryId="+encodeURIComponent(getSelectedBrowsingRepository());
                          if(type){
                            fileContentUrl+="&t="+encodeURIComponent(type);
                          }
                          if(classifier){
                            fileContentUrl+="&c="+encodeURIComponent(classifier);
                          }
                          fileContentUrl+="&p="+encodeURIComponent(file.substringBeforeLast("/"));
                          $.ajax({
                           url: fileContentUrl,
                           dataType: "text",
                           success: function(data) {
                             var text = data.replace(/</g,'&lt;');
                             text=text.replace(/>/g,"&gt;");
                             mainContent.find("#artifact-content-text" ).html(smallSpinnerImg());
                             mainContent.find("#artifact-content-text" ).html(text);
                             prettyPrint();
                             goToAnchor("artifact-content-text-header");
                           }
                          });
                  		  }