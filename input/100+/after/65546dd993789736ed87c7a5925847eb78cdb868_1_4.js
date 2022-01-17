function updateIcon(buildingID,categoryID){
     markerFeatures[buildingID].marker.setUrl(getIcon(buildingID,categoryID));  
}