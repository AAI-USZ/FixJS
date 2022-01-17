function (v,m,f) {
                        if(v !== undefined){
                            if (v === "ok"){                                
                                var newFileName = m.children()[1].value;     
                                
                                if (newFileName.length == 0) {
                                    alert("Please enter a file name");
                                } else {
                                    $.ajax({
                                        url: "duplicateTest",
                                        data: {path: test.path, newName: newFileName},
                                        type: "GET",
                                        async: true,
                                        success: function(response){
                                          if (response.success == "true") {
                                              myself.editFile(response.path);
                                              myself.popup.hide();                                
                                          } else {
                                            alert("Error while duplicating");
                                          }  
                                        }
                                    });                                                        
                                }
				            }	
			            }
                	}