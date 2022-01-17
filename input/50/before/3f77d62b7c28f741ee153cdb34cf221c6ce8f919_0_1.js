function showMapDirectPopup(){    
    if(typeof mapDirect!='undefined'){
        if(markerFeatures[mapDirect].popup==null)            
            fillPopup(markerFeatures[mapDirect]);  
        mapDirect=undefined;
    }  
}