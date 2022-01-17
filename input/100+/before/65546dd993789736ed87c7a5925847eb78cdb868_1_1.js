function getIcon(buildingID,categoryID){
   var icon;
   if(localStorage["favorites"]!=null){
        $.each(JSON.parse(localStorage["favorites"]), function(key, building) {            
            if(building!=null && building.id==buildingID)
               icon = new OpenLayers.Icon('img/markers/marker'+categoryID+'fav.png',iconSize,iconOffset);     
        });
    }
    if(JSON.parse(localStorage["seen"]!=null)){
        if(icon==null){
            $.each(JSON.parse(localStorage["seen"]), function(key, building) {
                if(building.id==buildingID)
                   icon = new OpenLayers.Icon('img/markers/marker'+categoryID+'seen.png',iconSize,iconOffset);     
            });        
        }
    }
    if(icon==null){
        icon = new OpenLayers.Icon('img/markers/marker'+categoryID+'.png',iconSize,iconOffset);    
    }     
    return icon;
}