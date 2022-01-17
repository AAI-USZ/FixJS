function playMovie(building) {    
    $.getJSON(server + '/Device.json?device='+deviceUUID,function(data) {
        if(data.exists==true) {
            window.plugins.videoPlayer.play('http://tali.irail.be/REST/Movie/qrID/' + building.token + '.gp3?device=' + deviceUUID);
            
            updateRightSideButtons(building.id);   
        }
        else{
            navigator.notification.alert("Video is only playable from a mobile device.", null, "Device not registered", "OK");;          
        }
    });  
    
}