function updateIcon(buildingID,category) {
    if(mapLoaded)
        markerFeatures[buildingID].marker.setUrl(getIcon(buildingID,category));  
}