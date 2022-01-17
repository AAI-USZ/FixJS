function(response)
                {
                     

                    var obj = jQuery.parseJSON(response);
                    
                   
                    var urladdress = obj.picture;
                                    
                    var msg = "<image src=" + urladdress + " style='width: 100%' />";
                    msg+= "<button id='changePicture_btn' style='position:absolute; left:1%; top: 5%' onclick='showChangeProfileDialog()'> Change Picture </button>";
                    
                    document.getElementById('profilePictureDiv').innerHTML = msg;
                    
                    $("#changePicture_btn").hide();
                    
                }