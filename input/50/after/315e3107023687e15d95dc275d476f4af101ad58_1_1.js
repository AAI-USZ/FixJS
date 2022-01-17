function() {
    if(mapLoaded) 
        if(typeof myRouteVector!='undefined')
            myRouteVector.destroyFeatures();  
            
                 /*   if(mapDirect != null){
        $.each(markerFeatures, function (markerFeature){
            if(typeof markerFeatures[markerFeature] != 'undefined')
                markerFeatures[markerFeature].popup.hide();
        });
        //activeFeaturePopup.hide();
        markerFeatures[mapDirect].popup.show();
        }  */ 
   /* if(typeof myRouteVector!='undefined')
        myRouteVector.destroyFeatures();   */
}