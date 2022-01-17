function(response){
                            if (response.success == "true") {

                                popupTextEditor.setFile(response.path);
                                popupTextEditor.update();
                                popupTextEditor.show();                            
                            } else {
                                alert("Error while creating new test");
                            }  
                        }