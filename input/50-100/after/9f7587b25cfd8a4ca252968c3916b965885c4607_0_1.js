function showMapDirectPopup(){    
    if(typeof mapDirect!='undefined'){
        if(markerFeatures[mapDirect].popup==null )
            fillPopup(markerFeatures[mapDirect]);
        if(markerFeatures[mapDirect].popup !=null && !markerFeatures[mapDirect].popup.visible())       
            showPopup(markerFeatures[mapDirect].popup)
        
        mapDirect=undefined;
    }  
}