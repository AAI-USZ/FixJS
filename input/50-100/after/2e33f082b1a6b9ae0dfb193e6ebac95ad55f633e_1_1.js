function() {
    if(!mapLoaded) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(loadMap, function() {
                alert('Could not detect position.');                
            });            
        }
    }
    else {
        
        showMapDirectPopup();        
        //markerArray[mapDirect].erase();             
    }
    //showMapDirectPopup(); 
}