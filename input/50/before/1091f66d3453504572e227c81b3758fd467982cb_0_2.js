function(response){
                                          if (response.success == "true") {
                                              myself.editFile(response.path);
                                              myself.popup.hide();                                
                                          } else {
                                            alert("Error while duplicating");
                                          }  
                                        }