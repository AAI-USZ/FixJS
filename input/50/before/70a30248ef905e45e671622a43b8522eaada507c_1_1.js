function updateIcon(buildingID,category) {
     markerFeatures[buildingID].marker.setUrl(getIcon(buildingID,category));  
}