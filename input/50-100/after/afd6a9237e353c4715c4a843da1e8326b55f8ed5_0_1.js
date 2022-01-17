function playMovie(building) {
    var device= device.uuid;
    $.getJSON('http://tali.irail.be/REST/Device.json?device='+device,function(data){
        if(data["exists"]=='true')
            window.plugins.videoPlayer.play('http://tali.irail.be/REST/Movie/qrID/' + building.token + '.gp3');
        else{
            navigator.notification.alert("Video is only playable from a mobile device.", null, "Device not registered", "OK");;          
        }
    });  
    
}