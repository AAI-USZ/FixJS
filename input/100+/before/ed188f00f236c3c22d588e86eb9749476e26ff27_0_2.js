function(){
                      mainContent.find("#artifact_content_tree").html("");
                      mainContent.find("#artifact-content-text" ).html("");
                      var idValue = $(this ).attr("id");
                      var classifier=idValue.substringBeforeLast(":");
                      var type = idValue.substringAfterLast(":");
                      $.log("click:" + idValue + " -> " + classifier + ":" + type );
                      if (type=="pom"){
                        $.log("show pom");
                        var pomContentUrl = "restServices/archivaServices/browseService/artifactContentText/"+encodeURIComponent(self.groupId);
                        pomContentUrl+="/"+encodeURIComponent(self.artifactId)+"/"+encodeURIComponent(self.version);
                        pomContentUrl+="?repositoryId="+encodeURIComponent(getSelectedBrowsingRepository());
                        pomContentUrl+="&t=pom";
                        mainContent.find("#artifact-content-text" ).html(smallSpinnerImg());
                        $.ajax({
                          url: pomContentUrl,
                          dataType: "text",
                          success: function(data) {
                            var text = data.replace(/</g,'&lt;');
                            text=text.replace(/>/g,"&gt;");
                            mainContent.find("#artifact-content-text" ).html(text);
                            prettyPrint();
                            goToAnchor("artifact-content-text-header");
                          }
                        });
                        return;
                      }
                      var entriesUrl = "restServices/archivaServices/browseService/artifactContentEntries/"+encodeURIComponent(self.groupId);
                      entriesUrl+="/"+encodeURIComponent(self.artifactId)+"/"+encodeURIComponent(self.version);
                      entriesUrl+="?repositoryId="+encodeURIComponent(getSelectedBrowsingRepository());
                      if(classifier){
                        entriesUrl+="&c="+encodeURIComponent(classifier);
                      }
                      $("#main-content #artifact_content_tree").fileTree({
                        script: entriesUrl,
                        root: ""
                  		  },function(file) {
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
                      );
                    }