function() {
    if(!mapLoaded) {
         if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(loadMap, function() {
                    alert('Could not detect');
                });    
        }  
    }else{
        showMapDirectPopup();  
    }        
}