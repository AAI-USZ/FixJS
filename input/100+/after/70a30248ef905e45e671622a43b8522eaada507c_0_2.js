function(data) {
        if(data.exists==true) {
            var seenArray = getLocalStorageArray('seen');
            
            var lookLaterArray = getLocalStorageArray('lookLater');
            lookLaterArray.remove(building);
            
            localStorage['lookLater'] = JSON.stringify(lookLaterArray);
            
            if(!checkBuildingInArray(seenArray, building.id)) {
                seenArray.push(building);    
                
                localStorage['seen'] = JSON.stringify(seenArray);
            } 
            
            window.plugins.videoPlayer.play('http://tali.irail.be/REST/Movie/qrID/' + building.token + '.gp3?device=' + deviceUUID);
       
            initHomeContent(false);
       
            $.getJSON('http://tali.irail.be/REST/building.json?select=category.name as catName&join=category&buildingID='+building.id, function(data){
                var catName = data.building[0].catName;
                
                updateIcon(building.id, catName.toLowerCase());
                mapDirect = building.id;
                window.location.href = '#map'; 
            });
        }
        else{
            navigator.notification.alert("Video is only playable from a mobile device.", null, "Device not registered", "OK");;          
        }
    }