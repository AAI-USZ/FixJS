function(button) {
                    
                    var building = new Building(data.buildingID, data.buildingName, data.token);
                    
                    if(button==1) {
                        var array;
                        if(localStorage['lookLater'] == null) {
                            array = new Array();    
                        }
                        else {
                            array = JSON.parse(localStorage['lookLater']);
                        }
                        
                        array.push(building);
                        
                        localStorage['lookLater'] = JSON.stringify(array);
                        
                        navigator.notification.alert('The video is saved. You can find it under the Look Later section', function(evt) { }, 'Look Later', 'Ok')
                    }
                    else if(button==2) {
                        playMovie(building);
                        
                        var array;
                        if(localStorage['seen'] == null) {
                            array = new Array(); 
                        }
                        else {
                            array = JSON.parse(localStorage['seen']);
                        }

                        array.push(building);
                        
                        localStorage['seen'] = JSON.stringify(array);
                    }
                    
                    initHomeContent(false);
                    
                }