function(result) {
        if(result.text != '') {
            var url = result.text.split('#');//http://tali.irail.be#2
            
            if(url[0] != siteUrl) {
                navigator.notification.alert('You scanned a QR-code that not belongs to Take A Look Inside.', function() { }, 'Wrong QR-code', 'Ok');
                
                return;       
            }
            
            
            
            $.getJSON(server + '/Movie/qrID/' + url[1] + '.json', function(data) {
                navigator.notification.confirm('The video is ' + $.trim(data.size) + ' KB big. When do you want to see the video?', function(button) {
                    
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
                        updateIcon(data.buildingID,data.categoryID);
                        updateRightSideButtons(data.buildingID);
                    }
                    
                    initHomeContent(false);
                    
                }, data.buildingName, 'Later,Now');
            });
        }

        // @seealso result.format, result.cancelled
    }