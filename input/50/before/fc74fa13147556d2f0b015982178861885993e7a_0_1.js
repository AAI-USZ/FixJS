function showMapDirectPopup(){    
    if(typeof mapDirect!='undefined'){
        showPopup(markerFeatures[mapDirect].popup);
        mapDirect=undefined;
    }  
}