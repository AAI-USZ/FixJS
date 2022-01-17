function getIcon(buildingID,categoryID){
   var icon;
   if(localStorage["favorites"]!=null){
        $.each(JSON.parse(localStorage["favorites"]), function(key, building) {            
            if(building!=null && building.id==buildingID)
               icon ='img/markers/marker'+categoryID+'fav.png';     
        });
    }
    if(JSON.parse(localStorage["seen"]!=null)){
        if(icon==null){
            $.each(JSON.parse(localStorage["seen"]), function(key, building) {
                if(building.id==buildingID)
                   icon= 'img/markers/marker'+categoryID+'seen.png';     
            });        
        }
    }
    if(icon==null){
        icon ='img/markers/marker'+categoryID+'.png';    
    }     
    return icon;
}